import React from 'react';

export default function AddingCategory({ categoryName, setCategoryName }: any) {
  return (
    <input
      value={categoryName}
      onChange={({ target }) => setCategoryName(target.value)}
      placeholder='Category name'
    />
  );
}
