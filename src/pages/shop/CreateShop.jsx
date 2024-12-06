import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import Input from '../../components/inputs/Input';
import Button from "../../components/buttons/Button";
import { createShop } from "../../store/actions/shopAction";
import routes from "../../routes/routesPath";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";

const CreateShop = () => {

    const { update, loading } = useSelector(state => state.shop)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nameShop, setNameShop] = useState('')
    const [phoneShop, setPhoneShop] = useState('')
    const [logoShop, setLogoShop] = useState('')
    const [addressShop, setAddressShop] = useState('')



    const [imagePreview, setImagePreview] = useState(null);

    // Function to handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file selected
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview to the file reader's result
                setLogoShop(file)
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    useEffect(() => {
        if (update) {
            navigate(routes.shop)
        }
    }, [update, navigate])

    // Function to handle image removal
    const handleImageRemove = () => {
        setImagePreview(null); // Remove the image preview
    };

    const handleCreateShop = () => {
        const ob = {
            nameShop,
            phoneShop,
            logoShop,
            addressShop,
        }
        dispatch(createShop(ob))
    }
    return (
        <div className="w-full flex items-center justify-center  ">
            {loading && <LoadingSyncLoader />}
            <div className="flex relative mb-4 w-3/4 mt-40 border-2 p-5 rounded-lg">
                <button
                onClick={()=> {navigate(routes.shop)}}
                className="absolute top-8 right-8 text-[30px]">
                    <IoClose/>
                </button>
                <div className="w-1/3 flex justify-center items-center">
                    <div className="relative w-[200px] h-[200px]" data-image-input="true">
                        {/* File Input */}
                        <input
                            accept=".png, .jpg, .jpeg"
                            name="avatar"
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageChange} // Handle file input change
                        />

                        {/* Remove Button */}
                        {imagePreview && (
                            <div
                                className="absolute text-[40px] z-10 w-5 h-5 bg-white rounded-full flex items-center justify-center -top-2 -right-2 shadow-lg cursor-pointer"
                                onClick={handleImageRemove} // Handle image removal
                                data-tooltip="#image_input_tooltip"
                                data-tooltip-trigger="hover"

                            >
                                <IoMdCloseCircleOutline />
                            </div>
                        )}

                        {/* Avatar Placeholder */}
                        <div
                            className={`image-input-placeholder w-full h-full bg-center bg-cover rounded-full border-2 ${imagePreview ? 'border-green-500' : 'border-gray-300'
                                }`}
                            style={{
                                backgroundImage: imagePreview
                                    ? `url(${imagePreview})`
                                    : 'url(/static/metronic/tailwind/docs/dist/assets/media/avatars/blank.png)',
                            }}
                        >
                            {/* Image Preview */}
                            <div className="image-input-preview w-full h-full rounded-full"></div>

                            {/* Camera Icon */}
                            {!imagePreview && (
                                <div className="text-[50px] absolute bottom-1/2 translate-y-1/2 left-0 right-0 h-5 bg-dark-clarity flex items-center justify-center cursor-pointer">
                                    <IoCameraOutline />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-3/4 flex items-center justify-center">
                    <div className="bg-[rgba(255,255,255,0.9)] rounded-xl px-4 w-full max-w-md">
                        <h2 className="text-4xl font-extrabold mb-6 text-center">TẠO CỬA HÀNG</h2>
                        <div className="space-y-6">
                            <div className="relative">
                                <Input
                                    label={"Tên cửa hàng"}
                                    type={'text'}
                                    rule={'empty'}
                                    value={nameShop}
                                    onChange={e => { setNameShop(e) }}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    label={"Số điện thoại"}
                                    type={'text'}
                                    rule={'empty'}
                                    value={phoneShop}
                                    onChange={e => setPhoneShop(e)}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    label={"Địa chỉ"}
                                    type={'text'}
                                    rule={'empty'}
                                    value={addressShop}
                                    onChange={e => setAddressShop(e)}
                                />
                            </div>
                            <div className="flex">
                                <Button
                                    to={''}
                                    primary={true}
                                    small={true}
                                    rounded={true}
                                    large={true}
                                    onClick={() => handleCreateShop()}
                                >
                                    Tạo cửa hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default CreateShop;
