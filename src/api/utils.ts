import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:8099',
    timeout: 1000, // 设置请求超时
});

// 使用实例发送请求
export const fetchItems = async function () {
    try {
        const response = await apiClient.get('/api/items2', {
            params: {
                name: 'NewItem',
                age: 30
            }
        });
        console.log('GET Response(fetchItems):', response.data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

export const createItem = async function () {
    const newItem = {
        name: 'NewItem',
        description: 'Item description',
        price: 10.99
    };

    try {
        const response = await apiClient.post('/items5', newItem);
        console.log('POST Response(createItem):', response.data);
    } catch (error) {
        console.error('Error creating item:', error);
    }
}
