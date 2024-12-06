import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import images from "../../assets/images";
import Breadcrumb from "../../components/helper/Breadcrumb";
import SelectBox from "../../components/selectBox/SelectBox";
import routes from "../../routes/routesPath";
import { getListRolesShop } from "../../store/actions/rolesAction";
import { getUserDetails, updateUser } from "../../store/actions/userManageAction";
import formatDate from "../../utils/formatDate";

function UserInfoDetails() {
    const { userDetails } = useSelector(state => state.userManage);  // Redux state
    const {data} = useSelector(state => state.role)
    const location = useLocation();
    const { userId } = location.state || {};
    const dispatch = useDispatch()
    console.log(userId);
    
    useEffect(()=>{
        dispatch(getListRolesShop())
    } , [dispatch])
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (userDetails?.id !== userId) {
            dispatch(getUserDetails(userId));
        }
    }, [dispatch, userId, userDetails?.id]);
    
    useEffect(() => {
        if (userDetails) {
            setFormData(userDetails);
        }
    }, [userDetails]);

    const [editable, setEditable] = useState(false);
    const [updatedImage, setUpdatedImage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedImage(URL.createObjectURL(file));
            setFormData({ ...formData, picture: file });
        }
    };

    const handleUpdate = () => {
        dispatch(updateUser(formData))
        setEditable(false);
    };

    return (
        <div>
            <Breadcrumb items={[{ name: 'Quản lý nhân viên', href: routes.list_user }, { name: 'thông tin cá nhân' }]} />
            <div className="text-[18px]">
                <div className="flex justify-center mb-5">
                    <img
                        src={updatedImage || formData?.picture || images.avt_user_default}
                        alt="User"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                {editable && (
                    <div className="flex justify-center mb-5">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} />
                    </div>
                )}
                <div className="grid grid-cols-3 grid-rows-3 gap-5">

                    <div >
                        <label className="block font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData?.email ?? ""}
                            className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                            disabled={true}
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Ngày tạo</label>
                        <input
                            type="date"
                            name="Ngày tạo"
                            value={formatDate(formData?.creationDate) ?? ""}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                            disabled={!editable}
                        />
                    </div>
                    <div >
                        <label className="block font-medium text-gray-700">Họ & Tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData?.fullName ?? ""}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                            disabled={!editable}
                        />
                    </div>
                    <div >
                        <label className="block font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData?.phoneNumber ?? ""}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                            disabled={!editable}
                        />
                    </div>
                    <div >
                        <label className="block font-medium text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formData?.address ?? ""}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                            disabled={!editable}
                        />
                    </div>
                    <div >
                        <label className="block font-medium text-gray-700">Ngày sinh</label>
                        <input
                            type="datetime"
                            name="birthDay"
                            value={formatDate(formData?.birthDay) ?? ""}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border-b-2 focus:border-[var(--primary)] outline-none border-gray-300"
                            disabled={!editable}
                        />
                    </div>
                    <div >
                        <label className="block font-medium text-gray-700">Giới tính</label>
                        <SelectBox
                            disabled={!editable}
                            label=""
                            keyName="id"
                            valueName="name"
                            defaultValue={+formData?.gender}
                            data={[{ name: "Nữ", id: 0 },{ name: "Nam", id: 1 },  { name: "Khác", id: 2 }]}
                            onChange={e => setFormData({ ...formData, gender: e })}
                        />
                    </div>
                    <div >
                        <label className="block font-medium text-gray-700">Được quản lý bởi</label>
                        <SelectBox
                            fullWidth
                            label=""
                            disabled={!editable}
                            // defaultValue={formData?.managerName}

                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Vai trò</label> 
                        <SelectBox
                            label=""
                            disabled={!editable}
                            data = {data}
                            keyName = "id"
                            valueName = "name"
                            onChange={e => setFormData({ ...formData, roleId: e })}
                            defaultValue={formData?.roleId}

                        />
                    </div>
                </div>
                <div className="mt-5 flex justify-end">
                    {!editable ? (
                        <button
                            onClick={() => setEditable(true)}
                            className="bg-[var(--primary)] text-white px-4 py-2 rounded-md">
                            sửa
                        </button>
                    ) : (
                        <div>
                            <button
                                onClick={() => {
                                    setEditable(false); console.log(formData);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-5">
                                Hủy
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-[var(--primary)] text-white px-4 py-2 rounded-md">
                                Lưu
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserInfoDetails;
