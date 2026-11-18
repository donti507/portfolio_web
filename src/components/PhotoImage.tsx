import { useState } from 'react';
import { asset } from '../data/assets';
import type { Photo } from '../data/photos';

export function PhotoImage({ photo, sizes, large = false, className = '' }: {
  photo: Photo; sizes?: string; large?: boolean; className?: string;
}) {
  const [ready, setReady] = useState(false);
  return <img
    ref={image => { if (image?.complete && image.naturalWidth) setReady(true); }}
    src={asset(large ? photo.src1600 : photo.src800)}
    srcSet={large ? undefined : `${asset(photo.src800)} 800w, ${asset(photo.src1600)} 1600w`}
    sizes={sizes}
    width={photo.width} height={photo.height}
    alt={photo.alt === '[add alt text]' ? photo.title : photo.alt}
    loading={large ? 'eager' : 'lazy'} decoding="async"
    onLoad={() => setReady(true)} onError={() => setReady(true)}
    style={ready ? undefined : {backgroundImage: `url("${photo.placeholder}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    className={'block h-auto w-full ' + className}
  />;
}
