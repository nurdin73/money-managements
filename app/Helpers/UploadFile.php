<?php

namespace App\Helpers;

use App\Models\Global\Attachment;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Image;
use Intervention\Image\ImageManager;

class UploadFile
{
  public string $extension;
  public string $mimeType;
  public int $size;
  public string $fileName;
  public string $path;
  public string $disk;
  public bool $dontStoreToDatabase = false;

  protected $TEMPLATE_COLORS = [
    ['bg' => '#f87171', 'text' => '#1c1917'],
    ['bg' => '#fb923c', 'text' => '#fff7ed'],
    ['bg' => '#fbbf24', 'text' => '#d97706'],
    ['bg' => '#4ade80', 'text' => '#f0fdf4'],
    ['bg' => '#22d3ee', 'text' => '#ecfeff'],
    ['bg' => '#164e63', 'text' => '#ecfeff'],
    ['bg' => '#1d4ed8', 'text' => '#eff6ff'],
    ['bg' => '#60a5fa', 'text' => '#eff6ff'],
    ['bg' => '#4f46e5', 'text' => '#eef2ff'],
    ['bg' => '#c026d3', 'text' => '#ecfeff'],
    ['bg' => '#e11d48', 'text' => '#ecfeff'],
    ['bg' => '#f472b6', 'text' => '#ecfeff'],
  ];

  public function __construct(string $disk = 'public', ?bool $dontStoreToDatabase = false)
  {
    $this->disk = $disk;
    $this->dontStoreToDatabase = $dontStoreToDatabase;
  }

  public function getRandomColor(): array
  {
    $colors = $this->TEMPLATE_COLORS;
    $random = rand(0, count($colors) - 1);
    return $colors[$random];
  }

  /**
   * store file
   *
   * @param [type] $entity
   * @param UploadedFile $file
   * @param string $dir
   * @param array $options ['tag' => 'abc']
   * @return Attachment
   */
  public function store($entity, UploadedFile $file, string $dir = '/', ?array $options = []): ?Attachment
  {
    $extension = $file->getClientOriginalExtension();
    $mimeType = $file->getMimeType();
    $size = $file->getSize();
    $fileName = $file->getClientOriginalName();

    $this->setExtension($extension);
    $this->setMimeType($mimeType);
    $this->setSize($size);
    $this->setFileName($fileName);

    $filenameGen = Str::uuid() . '.' . $extension;
    $path = $dir . DIRECTORY_SEPARATOR .  $filenameGen;
    if (!Storage::disk($this->disk)->put($path, $file->getContent(), $this->disk)) {
      throw new Exception("Error storing file!");
    }
    $user = auth()->user();
    $this->setPath($path);
    if (!$this->dontStoreToDatabase) {
      return Attachment::create([
        'attachable_type' => $entity ? get_class($entity) : 'attachments',
        'attachable_id' => $entity ? $entity->id : 0,
        'name' => $fileName,
        'mime_type' => $mimeType,
        'extension' => $extension,
        'size' => $size,
        'disk' => $this->disk,
        'path' => $path,
        'tag' => $options['tag'] ?? null
      ]);
    }
    return null;
  }


  public function bulkDestroyFile($entity, $tag = null)
  {
    $results = Attachment::where('attachable_type', get_class($entity))->where('attachable_id', $entity->id);
    if ($tag) {
      $results = $results->where('tag', $tag);
    }
    $results = $results->get();
    foreach ($results as $item) {
      $this->setDisk($item->disk);
      $this->destroy($item->path);
      $item->delete();
    }
  }

  // public function createAvatar($entity, string $text, int $width = 150, int $height = 150)
  // {
  //   $color = $this->getRandomColor();
  //   $letters = explode(' ', $text);
  //   $letter = '';
  //   if (count($letters) > 1) {
  //     $letter = $letters[0][0] . $letters[count($letters) - 1][0];
  //   } else {
  //     $letter = $letters[0][0] . $letters[0][1];
  //   }
  //   $dir = 'users/avatars';
  //   $filename = Str::uuid() . '.webp';
  //   $path = $dir . DIRECTORY_SEPARATOR . $filename;
  //   $imageManager = new ImageManager(new Driver());
  //   $image = $imageManager->create($width, $height);
  //   $image->fill($color['bg']);
  //   // $image = Image::canvas($width, $height, $color['bg']);
  //   $image->text(Str::upper($letter), $width / 2, $height / 2, function ($font) use ($color) {
  //     $font->file('assets/fonts/open-sans/regular.ttf');
  //     $font->size(50);
  //     $font->color($color['text']);
  //     $font->align('center');
  //     $font->valign('middle');
  //   });
  //   $imageData = $image->toWebp(90)->toFilePointer();
  //   if (!Storage::disk($this->disk)->put($path, $imageData, $this->disk)) {
  //     throw new Exception("Error storing file!");
  //   }
  //   $user = auth()->user();
  //   $pathDir = Storage::disk($this->disk)->path($path);
  //   return Attachment::create([
  //     'attachable_type' => get_class($entity),
  //     'attachable_id' => $entity->id,
  //     'name' => $filename,
  //     'mime_type' => mime_content_type($pathDir),
  //     'extension' => 'webp',
  //     'size' => filesize($pathDir),
  //     'disk' => $this->disk,
  //     'path' => $path,
  //     'author' => auth()->check() ? "{$user->id} | {$user->fullname} | {$user->email}" : "Guest",
  //     'tag' => 'avatar'
  //   ]);
  // }

  public function getPathUrl()
  {
    $path = $this->getPath();
    return Str::getPathUrl($path);
  }

  public function destroy($path)
  {
    try {
      Storage::disk($this->disk)->delete($path);
      Attachment::where('path', $path)->delete();
    } catch (\Throwable $th) {
      throw $th;
    }
  }

  /**
   * Get the value of extension
   *
   * @return string
   */
  public function getExtension(): string
  {
    return $this->extension;
  }

  /**
   * Set the value of extension
   *
   * @param string $extension
   *
   * @return self
   */
  public function setExtension(string $extension): self
  {
    $this->extension = $extension;

    return $this;
  }

  /**
   * Get the value of mimeType
   *
   * @return string
   */
  public function getMimeType(): string
  {
    return $this->mimeType;
  }

  /**
   * Set the value of mimeType
   *
   * @param string $mimeType
   *
   * @return self
   */
  public function setMimeType(string $mimeType): self
  {
    $this->mimeType = $mimeType;

    return $this;
  }

  /**
   * Get the value of size
   *
   * @return int
   */
  public function getSize(): int
  {
    return $this->size;
  }

  /**
   * Set the value of size
   *
   * @param int $size
   *
   * @return self
   */
  public function setSize(int $size): self
  {
    $this->size = $size;

    return $this;
  }

  /**
   * Get the value of fileName
   *
   * @return string
   */
  public function getFileName(): string
  {
    return $this->fileName;
  }

  /**
   * Set the value of fileName
   *
   * @param string $fileName
   *
   * @return self
   */
  public function setFileName(string $fileName): self
  {
    $this->fileName = $fileName;

    return $this;
  }

  /**
   * Get the value of path
   *
   * @return string
   */
  public function getPath(): string
  {
    return $this->path;
  }

  /**
   * Set the value of path
   *
   * @param string $path
   *
   * @return self
   */
  public function setPath(string $path): self
  {
    $this->path = $path;

    return $this;
  }

  /**
   * Get the value of disk
   *
   * @return string
   */
  public function getDisk(): string
  {
    return $this->disk;
  }

  /**
   * Set the value of disk
   *
   * @param string $disk
   *
   * @return self
   */
  public function setDisk(string $disk): self
  {
    $this->disk = $disk;

    return $this;
  }
}
