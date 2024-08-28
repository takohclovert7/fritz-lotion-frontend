import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './MyTabView.css'; // Import the custom CSS file
import AdminUploadProduct from './adminUploadProduct';
import AdminSeeAllOrders from './adminSeeAllOrders';

function MyTabView() {
  return (
    <Tabs>
      <TabList>
        <Tab>Upload Product</Tab>
        <Tab>See All Orders</Tab>
      </TabList>

      <TabPanel>
        <AdminUploadProduct />
      </TabPanel>
      <TabPanel>
        <AdminSeeAllOrders />
      </TabPanel>
    </Tabs>
  );
}

export default MyTabView;
