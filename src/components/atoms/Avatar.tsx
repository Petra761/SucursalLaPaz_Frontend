interface AvatarProps {
  src: string;
  alt?: string;
}

export function Avatar({ src, alt = "User avatar" }: AvatarProps) {
  return (
    <div
      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-border-color-light dark:border-gray-700"
      role="img"
      aria-label={alt}
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
}
