import { useState } from "react";
import Image from "next/image";
import cn from "clsx";

import type { ImageProps } from "next/image";

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
} & ImageProps;

/**
 *
 * @description Must set width and height, if not add fill={true} to ImageProps
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export function NextImage({
  src,
  alt,
  width,
  height,
  children,
  className,
  useSkeleton,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps): JSX.Element {
  const [loading, setLoading] = useState(!!useSkeleton);

  const handleLoad = (): void => setLoading(false);

  return (
    <figure style={{ width }} className={cn(className, "relative overflow-hidden")}>
      <Image
        className={cn(
          "h-auto w-full",
          imgClassName,
          loading
            ? blurClassName ?? "animate-pulse rounded-full bg-light-secondary dark:bg-dark-secondary"
            : "object-cover",
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={handleLoad}
        sizes="(max-width: 640px) 100vw, 640px"
        {...rest}
      />
      {children}
    </figure>
  );
}
