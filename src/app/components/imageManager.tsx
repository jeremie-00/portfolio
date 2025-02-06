import Image from "next/image";

interface ImageProps {
  url: string;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
}
export const ImageManager = ({
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
      <div className="w-full h-full flex items-center justify-center gap-8">
        {imagePreview && (
          <span>
            Nouvelle
            <div className="border border-primary rounded-lg p-6">
              <Image
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
              />
            </div>
          </span>
        )}
        {url && (
          <span>
            Ancienne
            <div className="border border-primary rounded-lg p-6">
              <Image src={url} alt="Preview" width={100} height={100} />
            </div>
          </span>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};
