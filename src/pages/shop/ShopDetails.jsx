import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DialogInput from '../../components/dialog/DialogInput';
import routes from '../../routes/routesPath';
import { deleteShop, getShopById, updateShop } from '../../store/actions/shopAction';
import formatDate from '../../utils/formatDate';
import env from '../../constants/env';

export default function ShopDetails() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux store
    const { data: shopData } = useSelector(state => state.shop);
   
    const [isEditing, setIsEditing] = useState(false); // Quản lý trạng thái chỉnh sửa
    const [newShopLogo, setNewShopLogo] = useState(null); // Trạng thái lưu trữ ảnh mới
    const [editedShopData, setEditedShopData] = useState(null); // Quản lý dữ liệu trong chế độ chỉnh sửa
    const [openDialog, setOpenDialog] = useState(false)
    // Nếu có ID của shop trong localStorage, dispatch action để lấy dữ liệu
   
    
    useEffect(() => {
        const idShop = localStorage.getItem(env.REACT_APP_IDSHOP);
        if (idShop) {
            dispatch(getShopById(+atob(idShop)));
        } else {
            navigate(routes.shop);
        }

    }, [dispatch, navigate]);

    // Cập nhật `editedShopData` khi vào chế độ chỉnh sửa
    useEffect(() => {
        if (shopData && isEditing) {
            setEditedShopData(shopData); // Sao chép dữ liệu ban đầu vào `editedShopData` khi bắt đầu chỉnh sửa
        }
    }, [shopData, isEditing]);

    // Hàm định dạng ngày dd/mm/yy
    

    // Hàm xử lý thay đổi giá trị khi chỉnh sửa
    const handleChange = (e) => {
        setEditedShopData({
            ...editedShopData,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý thay đổi ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedShopData({ ...editedShopData, shopLogo: file })
            const imageUrl = URL.createObjectURL(file);
            setNewShopLogo(imageUrl); // Hiển thị ảnh mới
        }
    };

    // Hàm lưu lại thông tin đã chỉnh sửa
    const handleSave = () => {

        setIsEditing(false); // Đóng form chỉnh sửa
        // // Dispatch action để lưu lại dữ liệu nếu cần
        dispatch(updateShop(editedShopData))
    };
    const handleCloseDialog = () => {
        setOpenDialog(false)
        // setEditedShopData(null)
    }
    const handleSubmitDialog = (password) => {
        const payload = {
            id: shopData.id,
            password: password
        }
        dispatch(deleteShop(payload))
    }
    
    
    return (
        <div className="o mt-10 p-6">
           
            <DialogInput
                        handleClose={handleCloseDialog}
                        onSubmit={handleSubmitDialog}
                        open={openDialog} />
            <div className="flex items-center justify-center mb-6">
                <img
                    src={newShopLogo || shopData?.shopLogo}
                    alt="Shop Logo"
                    className="object-cover w-32 h-32 rounded-full shadow-lg"
                />
            </div>
            {isEditing ? (
                // Chế độ chỉnh sửa
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold">Tên cửa hàng</label>
                        <input
                            type="text"
                            name="shopName"
                            value={editedShopData?.shopName || ''}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Số điện thoại</label>
                        <input
                            type="text"
                            name="shopPhone"
                            value={editedShopData?.shopPhone || ''}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Địa chỉ</label>
                        <input
                            type="text"
                            name="shopAddress"
                            value={editedShopData?.shopAddress || ''}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Thay đổi ảnh</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border p-2 rounded-md"
                        />
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            ) : (
                // Chế độ xem
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">{shopData?.shopName}</h2>
                    </div>
                    <div>
                        <p className="font-semibold">Số điện thoại: </p>
                        <p>{shopData?.shopPhone}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Địa chỉ: </p>
                        <p>{shopData?.shopAddress}</p>
                    </div>
                    <div>
                        <p className={`font-semibold ${shopData?.isActive ? 'text-green-500' : 'text-red-500'}`}>
                            {shopData?.isActive ? 'Đang mở cửa' : 'Đang đóng cửa'}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Ngày tạo: {formatDate(shopData?.createAt)}</p>
                        <p className="font-semibold">Cập nhật lần cuối: {formatDate(shopData?.updateAt)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Sửa thông tin
                        </button>

                        <button
                            onClick={() => setOpenDialog(true)}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            Xóa cửa hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
