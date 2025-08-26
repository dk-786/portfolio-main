import Image from "next/image";

interface ProductImageProps {
  img: string;
  name: string;
}

const ProductImage = ({ img, name }: ProductImageProps) => {
  return (
    <div className="w-full md:w-[50%] p-6">
      <Image
        src={img}
        alt={name}
        width={500}
        height={500}
        className="w-full shadow mb-4"
      />
    </div>
  );
};

export default ProductImage;
