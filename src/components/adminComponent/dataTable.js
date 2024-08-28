import React from 'react';

const DataTable = ({data}) => {
  

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Price/fcfa</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Buy Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Buyer Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <img src={item.cover} alt="Cover" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.description}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.price}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.buyname}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.buyeremail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
