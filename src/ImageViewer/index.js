import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

export default ({data, index, enableSwipeDown, onSwipeDown}) => {
  return (
    <ImageViewer
      imageUrls={data.map(e => ({url: e}))}
      enableImageZoom={true}
      index={index}
      enableSwipeDown={enableSwipeDown}
      onSwipeDown={onSwipeDown}
    />
  );
}
