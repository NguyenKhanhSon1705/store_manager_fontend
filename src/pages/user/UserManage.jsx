import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CiLock } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { LuFolderTree } from "react-icons/lu";

import { Box, Pagination, Stack, TextField } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { FaRegUserCircle } from 'react-icons/fa';

import images from '../../assets/images';
import Button from '../../components/buttons/Button';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';
import { createUser, getUserOfList, getUserOfTree, getUserOfTreeById, lockUser } from '../../store/actions/userManageAction';
import routes from "../../routes/routesPath";
import Breadcrumb from "../../components/helper/Breadcrumb";
import DialogCreateUser from '../../components/dialog/DialogCreateUser';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../routes/routesPath';
import { Modal } from 'antd';

const colors = [
    '#f8f9f9',
    '#d7dbdd',
    '#a6acaf',
    '#626567',
];
const {confirm} = Modal
export default function UserManage() {
    const [treeOrList, setTreeOrList] = useState(true)
    const [openCreate, setOpenCreate] = useState(false)
    const [indexPage, setIndexPage] = useState(1)
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserOfList())
    }, [dispatch])

    const { listUser, loading} = useSelector(state => state.userManage)
    const handleSubmitLookUser = (item) => {
        confirm({
            title: "Bạn chắc chắn xóa không ?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            centered: true,
            onOk() {
              dispatch(lockUser(item));
            },
          });
    }
    const handleClose = useCallback(() => {
        setOpenCreate(false)
    }, [])

    const handleSubmitCreate = useCallback((data) => {
        dispatch(createUser(data));
    }, [dispatch])

    const handleListUser = () => {
        setTreeOrList(!treeOrList)
        dispatch(getUserOfList(1))
    }

    const handleTreeUser = () => {
        dispatch(getUserOfTree())
        setTreeOrList(!treeOrList)
    }

    const handlePaging = (value) => {
        dispatch(getUserOfList(value))
        setIndexPage(5 * value - 5 + 1)
    }

    const renderTreeItems = (nodes, level = 0) => {
        const handleClick = (e, id) => {
            const cellWidth = e.currentTarget.offsetWidth;
            const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
            if (clickX < cellWidth / 2) {
                dispatch(getUserOfTreeById(id))
            }
        };

        const backgroundColor = colors[level % colors.length];

        return (
            <TreeItem
                key={nodes.id}
                itemId={nodes.id}
                label={
                    <div
                        className='p-2 rounded-lg flex justify-around items-center'
                        onClick={(e) => handleClick(e, nodes.id)} // Add click handler here
                        style={{ backgroundColor }} // Apply background color
                    >
                        <div className='w-[60px] bg-white flex justify-center rounded-lg'>
                            <img
                                style={{
                                    width: '50px',    // Set the fixed width to 50px
                                    height: 'auto',   // Maintain aspect ratio
                                    maxHeight: '50px', // Set a max height if necessary to prevent overflow
                                    objectFit: 'cover' // Ensures the image covers the area without distortion
                                }}

                                src={nodes.picture || images.avt_user_default} alt={nodes.email} />
                        </div>
                        <b className='w-1/4 border-r-2 px-2 overflow-hidden text-ellipsis whitespace-nowrap'>{nodes.email}</b>
                        <p className=" w-1/4 border-r-2 px-2 overflow-hidden text-ellipsis whitespace-nowrap">{nodes.fullName || "..."}</p>
                        <p className='w-1/4 border-r-2 px-2'>{nodes.phone || "..."}</p>
                        <p className='w-1/4 border-r-2 px-2'>{nodes.roles || "..."}</p>

                        <div className="flex pl-2">
                            <Button
                                to={routes.user_detail.replace(':userId', nodes.id)}
                                onClick={()=> handleShowUserDetails(nodes.id)}
                                primary={true}
                                rounded={true}
                                classDiff={"mr-2"}
                            >
                                <FaRegUserCircle />
                            </Button>
                            <Button
                                primary={false}
                                rounded={true}
                                outline={false}
                                classDiff={"bg-orange-400 text-white"}
                                onClick={() => handleSubmitLookUser(nodes.id)}
                            >
                                <CiLock />
                            </Button>
                        </div>
                    </div>
                }
            >
                {Array.isArray(nodes.children)
                    ? nodes.children.map((childNode) => renderTreeItems(childNode, level + 1)) // Increment level for child nodes
                    : null}
            </TreeItem>
        );
    };

    const handleShowUserDetails = (userId) => {
        navigate(ROUTE_PATH.user_detail, { state: { userId: userId} });
    }

    return (
        <div>
            
            <DialogCreateUser
                open={openCreate}
                onClose={handleClose}
                onSubmit={handleSubmitCreate}
            />
            <Breadcrumb
                items={[{ name: 'Thông tin nhân viên', href: '' }]}
            />

            <div className="flex justify-between mb-5">
                <div className='w-1/4'>
                    <TextField
                        id="standard-basic"
                        label="Tìm kiếm"
                        fullWidth
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        variant="standard"
                        disabled={!treeOrList}
                    />
                </div>
                <div className='flex justify-end mb-5'>
                    <Button
                        leftIcon={<IoMdAddCircleOutline />}
                        classDiff={"bg-[var(--bg-btn-add)] text-[var(--textlight)]"}
                        rounded
                        onClick={() => setOpenCreate(true)}
                        disabled={!treeOrList}
                    >
                        Thêm
                    </Button>
                    <Button
                        classDiff={"bg-[#4eceb2] text-[var(--textlight)]  mx-2"}
                        rounded
                        leftIcon={<FaRegListAlt />}
                        disabled={treeOrList}
                        onClick={handleListUser}
                    >
                        Danh sách
                    </Button>
                    <Button
                        classDiff={"bg-[#4eceb2] text-[var(--textlight)]"}
                        rounded
                        leftIcon={<LuFolderTree />}
                        disabled={!treeOrList}
                        onClick={handleTreeUser}
                    >
                        Cây
                    </Button>
                </div>
            </div>

            {
                !treeOrList && <Box sx={{ minHeight: 352, minWidth: 250 }}>
                    <SimpleTreeView>
                        {
                            loading
                                ? <LoadingSkeleton />
                                :
                                listUser?.length > 0 &&
                                listUser.map((node) => renderTreeItems(node))
                        }
                    </SimpleTreeView>
                </Box>
            }
            {
                treeOrList &&
                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    #
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Họ & Tên
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3 w-[15%]">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-4 py-3 w-[15%]">
                                    Vai trò
                                </th>
                                <th scope="col" className="px-4 py-3 w-[15%]">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                listUser?.items?.length > 0 && listUser?.items?.map((item, index) => {

                                    return (
                                        <tr key={item?.id} className="odd:bg-gray-200 even:bg-white border-b ">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                                {indexPage + index}
                                            </th>
                                            <td className="px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
                                                {item?.fullName}
                                            </td>
                                            <td className="px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
                                                {item?.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item?.phoneNumber}
                                            </td>
                                            <td className={`px-4 py-3`}>
                                                {item?.roles}
                                            </td>

                                            <td className="px-4 py-3 flex ">
                                                <Button
                                                    onClick={()=> handleShowUserDetails(item.id)}
                                                    primary={true}
                                                    rounded={true}
                                                    classDiff={"mr-2"}
                                                >
                                                    <FaRegUserCircle />
                                                </Button>
                                                <Button
                                                    primary={false}
                                                    rounded={true}
                                                    outline={false}
                                                    classDiff={"bg-orange-400 text-white"}
                                                    onClick={() => handleSubmitLookUser(item.id)}
                                                >
                                                    <CiLock />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                    <div className='p-4 float-end'>
                        {/* doccument */}
                        <Stack
                            spacing={2}>
                            <Pagination
                                onChange={(e, value) => handlePaging(value)}
                                count={listUser.totalPages} />
                        </Stack>
                    </div>
                </div>
            }
        </div>
    );
}
