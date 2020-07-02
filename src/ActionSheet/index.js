import React from 'react';
import ActionSheet from 'react-native-actions-sheet';

export default function ActionSheet({ref, children}) {
  return (
    <ActionSheet
      ref={ref}
      headerAlwaysVisible={true}
      footerAlwaysVisible={true}
      gestureEnabled={true}
      bounceOnOpen={true}>
      {children}
    </ActionSheet>

  );
}
