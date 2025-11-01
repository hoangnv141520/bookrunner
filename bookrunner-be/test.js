let users = ['Alice', 'Bob', 'Charlie'];
let data = [...users];

console.log(data); // ['Alice', 'Bob', 'Charlie']

// Thay đổi mảng `data`
data.push('Dave');
console.log(data);  // ['Alice', 'Bob', 'Charlie', 'Dave']
console.log(users); // ['Alice', 'Bob', 'Charlie'] (không thay đổi)
