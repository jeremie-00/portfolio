import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface ImageProps {
  name?: string;
  url: string | null;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
}

export const imageStateDefault = {
  id: "",
  url: "",
  alt: "",
  aboutId: null,
  skillId: null,
  avatarRectoId: null,
  avatarVersoId: null,
  coverId: null,
  mediasId: null,
};

export const ImageManager = ({
  name = "image",
  url,
  imagePreview,
  setImagePreview,
}: ImageProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-left gap-8">
        {url && (
          <div className="flex flex-col">
            Actuelle
            <div className="flex h-full w-full border border-primary rounded-lg p-6">
              <Image
                src={url}
                alt="Preview"
                width={150}
                height={150}
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        )}
        {imagePreview && (
          <div className="flex flex-col">
            Nouvelle
            <div className="flex h-full w-full border border-primary rounded-lg p-6">
              <Image
                src={imagePreview}
                alt="Preview"
                width={150}
                height={150}
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          name={name}
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};

type ImagesProps = {
  updated: boolean;
  name?: string;
  url?: string[];
  imagePreview: string[];
  setImagePreview: (images: string[]) => void;
};

export const ImagesManager = ({
  updated,
  name = "images",
  url = [],
  imagePreview,
  setImagePreview,
}: ImagesProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImagePreviews: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImagePreviews.push(reader.result as string);
        if (newImagePreviews.length === files.length) {
          setImagePreview([...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        {/* Anciennes images */}
        {updated && url.length > 0 && (
          <span className="text-lg">
            Actuels
            <div className="flex flex-wrap items-left justify-left gap-2 mt-4">
              {url.map((src, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border border-primary rounded-lg p-6 gap-2"
                >
                  <Image
                    src={src}
                    alt="Ancienne Preview"
                    width={150}
                    height={150}
                    className="rounded-lg flex-1 object-contain"
                  />
                  <Checkbox name={`${name}_update`} value={src} />
                </div>
              ))}
            </div>
          </span>
        )}

        {/* Prévisualisation des nouvelles images sélectionnées */}
        {imagePreview.length > 0 && (
          <div className="flex flex-col w-full">
            Nouvelle
            <div className="flex flex-wrap h-full w-full rounded-lg gap-2">
              {imagePreview.map((src, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-primary rounded-lg p-6 gap-2"
                >
                  <Image
                    key={index}
                    src={src}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="rounded-lg flex-1 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Input pour ajouter des images */}
      <div>
        <input
          multiple
          type="file"
          accept="image/*"
          name={name}
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};
