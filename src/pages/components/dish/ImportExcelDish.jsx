import { Button, Image, Modal, Table, Upload } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import images from "~/assets/images";
// eslint-disable-next-line react/prop-types
function ImportExcelDish({onCancel}) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const columns = [
        { title: "Tên món ăn", dataIndex: "Tên món ăn", key: "Tên món ăn" },
        { title: "Hình ảnh", dataIndex: "Hình ảnh", key: "Tên món ăn", render: (image) => (
            <Image
            width={90}
            // height={50}
            objectfit="cover"
            className="rounded-lg"
            src={image || images.img_default}
            alt={images.img_default}
            fallback={images.img_default}
          />
        ) },
        { title: "Giá bán", dataIndex: "Giá bán", key: "Giá bán" },
        { title: "Giá bán cũ", dataIndex: "Giá bán cũ ", key: "Giá bán cũ " },
        { title: "Giá gốc", dataIndex: "Giá gốc", key: "Giá gốc" },
        { title: "Thứ tự", dataIndex: "Thứ tự", key: "Thứ tự" },
        { title: "Thuộc nhóm", dataIndex: "Thuộc nhóm", key: "Thuộc nhóm" },
        { title: "Đơn vị", dataIndex: "Đơn vị", key: "Đơn vị" },
        { title: "Hot", dataIndex: "Hot", key: "Hot" },
        { title: "Trạng thái", dataIndex: "Trạng thái", key: "Trạng thái" },
    ];
    const scroll = {};
    const tableColumns = columns.map((item) => ({
        ...item,
        ellipsis: true, // Cho phép xem nội dung tràn ngang
      }));
    
      (tableColumns[0].fixed = true),
        (tableColumns[tableColumns.length - 1].fixed = "right");
      (scroll.y = 440), (scroll.x = "100vw");
    
    const handleCancel = () => {
        setIsModalOpen(false);
        onCancel(false)
    }
    // Hàm tải file mẫu
    const handleDownloadTemplate = () => {
        const templateData = [
            {
                "Tên món ăn": "Cha Ca",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1734934334/Image/Screenshot_10_hasvuu.png",
                "Giá bán": "40.000",
                "Giá bán cũ ": "333.333, 30.000",
                "Giá gốc": "250.000",
                "Thứ tự": 7,
                "Thuộc nhóm": "Mì & Phở, Snacks",
                "Đơn vị": "Dish",
                "Hot": "Bán chạy",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Che Ba Mau",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735096882/Image/bread_vorpkk.jpg",
                "Giá bán": "20.000",
                "Giá bán cũ ": "",
                "Giá gốc": "20.000",
                "Thứ tự": 13,
                "Thuộc nhóm": "Mì & Phở, Snacks",
                "Đơn vị": "Cup",
                "Hot": "",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Com Ga",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735096896/Image/menu1_qb4e9v.jpg",
                "Giá bán": "472.363",
                "Giá bán cũ ": "",
                "Giá gốc": "90.000",
                "Thứ tự": 5,
                "Thuộc nhóm": "Vegetarian Dishes, Pasta",
                "Đơn vị": "Plate",
                "Hot": "Bán chạy",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Goi Cuon",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735096909/Image/noodles_cogxmg.jpg",
                "Giá bán": "284.636",
                "Giá bán cũ ": "",
                "Giá gốc": "30.000",
                "Thứ tự": 8,
                "Thuộc nhóm": "Pizza, Sandwiches",
                "Đơn vị": "Piece",
                "Hot": "",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Hu Tieu",
                "Hình ảnh": "https://example.com/image11.jpg",
                "Giá bán": "484.104",
                "Giá bán cũ ": "",
                "Giá gốc": "60.000",
                "Thứ tự": 11,
                "Thuộc nhóm": "Hot and Sour Soups, Kebabs",
                "Đơn vị": "Bowl",
                "Hot": "Bán chạy",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Mi Quang",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735097060/Image/noodles_az6cw0.jpg",
                "Giá bán": "299.999",
                "Giá bán cũ ": "181.465",
                "Giá gốc": "75.000",
                "Thứ tự": 10,
                "Thuộc nhóm": "Dumplings, Curries",
                "Đơn vị": "Bowl",
                "Hot": "Bán chạy",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Nem Ran",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735116578/Image/sharma_kwnncm.jpg",
                "Giá bán": "378.120",
                "Giá bán cũ ": "",
                "Giá gốc": "100.000",
                "Thứ tự": 12,
                "Thuộc nhóm": "Hot Pot, Baked Goods",
                "Đơn vị": "Plate",
                "Hot": "",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Nuoc Mia",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735013021/Image/Screenshot_28_uaoeoi.png",
                "Giá bán": "20.000",
                "Giá bán cũ ": "",
                "Giá gốc": "10.000",
                "Thứ tự": 15,
                "Thuộc nhóm": "Soft Drinks",
                "Đơn vị": "Cup",
                "Hot": "",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Spring Rolls",
                "Hình ảnh": "https://res.cloudinary.com/dzegstfpm/image/upload/v1735096344/Image/Screenshot_115_kotdfs.png",
                "Giá bán": "178.688",
                "Giá bán cũ ": "",
                "Giá gốc": "50.000",
                "Thứ tự": 3,
                "Thuộc nhóm": "Desserts, Beverages",
                "Đơn vị": "Plate",
                "Hot": "",
                "Trạng thái": "Hoạt động"
            },
            {
                "Tên món ăn": "Tra Sua",
                "Hình ảnh": "https://example.com/image14.jpg",
                "Giá bán": "53.089",
                "Giá bán cũ ": "",
                "Giá gốc": "35.000",
                "Thứ tự": 14,
                "Thuộc nhóm": "Cakes, Ice Creams",
                "Đơn vị": "Cup",
                "Hot": "Bán chạy",
                "Trạng thái": "Hoạt động"
            }
        ]
        const worksheet = XLSX.utils.json_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
        XLSX.writeFile(workbook, "Mau_Excel.xlsx");
    };

    // Hàm xử lý đọc file Excel
    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(jsonData);
        };
        reader.readAsArrayBuffer(file);
        return false; // Không upload file trực tiếp
    };

    // Hàm gửi dữ liệu lên server (tùy chọn)
    const handleSubmit = () => {
        // console.log("Excel Data:", excelData);
        handleCancel(); // Đóng modal sau khi gửi dữ liệu
        const mappedData = excelData.map((item, index) => ({
            id: index + 1,  // Gán ID tự động
            dish_name: item["Tên món ăn"] || null,  // Tên món ăn
            image: item["Hình ảnh"] || null,  // Hình ảnh
            menu_group: item["Thuộc nhóm"] || null,  // Nhóm menu
            selling_price: item["Giá bán"] ? item["Giá bán"].replace(/\./g, '') : null,  // Giá bán
            selling_price_old: item["Giá bán cũ "] || null,  // Giá bán cũ
            origin_price: item["Giá gốc"] || null,  // Giá gốc
            unit_name: item["Đơn vị"] || null,  // Đơn vị
            order: item["Thứ tự"] ? item["Thứ tự"].toString() : null,  // Thứ tự, chuyển thành chuỗi
            is_hot: item["Hot"] === "Bán chạy" ? true : false,  // Xác định món ăn có phải là "Hot"
            status: item["Trạng thái"] === "Hoạt động" ? true : false,  // Xác định trạng thái món ăn
          }));
          
          console.log(mappedData);
    };
    return (
        <div>
            <Modal
                title="Import Dữ Liệu Từ Excel"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="Nhập dữ liệu"
                cancelText="Hủy"
                width={1000}
            >
                <div style={{ marginBottom: 16 }}>
                    <p>
                    <b>Bước 1: </b> Tải file excel mẫu và nhập thông tin thực đơn món ăn
                    </p>
                    <Button
                        type="default"
                        className="bg-green-600 text-white"
                        icon={<DownloadOutlined />}
                        onClick={handleDownloadTemplate}
                    >
                        Tải File Mẫu
                    </Button>
                </div>
                <p>
                <b>Bước 2: </b> Chọn file excel đã nhập liệu.
                    </p>
                <Upload
                    beforeUpload={handleFileUpload}
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                    accept=".xlsx, .xls"
                    maxCount={1}
                >
                    <Button className="bg-green-600 text-white" icon={<UploadOutlined />}>Chọn File Excel</Button>
                </Upload>
                <p className="mt-3">
                <b>Bước 3: </b>Xem sơ bộ dữ liệu đọc từ file
                    </p>
                    {excelData.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        <h3>Dữ Liệu Import</h3>
                        <Table
                        scroll={scroll}
                        tableLayout
                            columns={tableColumns}
                            dataSource={excelData.map((item, index) => ({
                                key: index,
                                ...item,
                            }))}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                )}
                <p className="mt-3">
                <b>Bước 4: </b>Xác nhận nhập dữ liệu
                    </p>
            </Modal>
        </div>
    );
}

export default ImportExcelDish;