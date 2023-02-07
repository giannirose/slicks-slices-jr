import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

// allow a plug-in to wrap a page element
// export, but not "export default" as on pages
export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
// Wes instructs to rebuild the file; the need to rebuild will probably change, but for now we may need to  go to Terminal rebuild the process
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
