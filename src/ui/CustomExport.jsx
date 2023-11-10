import React from 'react';
import { GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';

export default function CustomExport() {
    return (
        <GridToolbarContainer
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <GridToolbarExport />
        </GridToolbarContainer>
      );
}
