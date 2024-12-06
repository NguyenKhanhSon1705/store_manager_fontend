import { Fragment, memo, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SelectBox from "../selectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { getListAreas } from "../../store/actions/areasAction";
import { Checkbox, FormControlLabel } from "@mui/material";
import { removeDotsVND, validatePriceVND } from "../../utils/validatePriceVND";
import PropTypes from "prop-types";

function DialogCreateTables({ title, open, onClose, onSubmit, items = [] }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.area);

  const [hasHourlyRate, sethasHourlyRate] = useState(!!items?.hasHourlyRate); // Đảm bảo giá trị ban đầu luôn là boolean

  const [priceOfMunite, setpriceOfMunite] = useState("");
  const [areaId, setareaId] = useState(0);
  const [nameTable, setnameTable] = useState("");



  useEffect(() => {
    dispatch(getListAreas());
  }, [dispatch]);

//   useEffect(() => {
//     if (items) {
//       sethasHourlyRate(!!items.hasHourlyRate); // Chuyển đổi giá trị thành boolean
//       setpriceOfMunite(validatePriceVND("" + items.priceOfMunite));
//       setareaId(items.areaId);
//       setnameTable(items.nameTable);
//     }
//   }, [items]);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            onClose();
            onSubmit({
              id: items?.id || "",
              areaId,
              hasHourlyRate,
              priceOfMunite: removeDotsVND(priceOfMunite) || 0,
              nameTable,
            });
          },
        }}
        fullWidth
      >
        <DialogTitle textAlign={"center"}>{title}</DialogTitle>
        <DialogContent content="center">
          <SelectBox
            fullWidth={true}
            data={data}
            valueName="areaName"
            keyName="id"
            label="Khu vực"
            onChange={(value) => setareaId(value)}
            defaultValue={areaId}
          />

          <TextField
            autoFocus={true}
            required={true}
            label={"Tên bàn"}
            type={"text"}
            value={nameTable}
            onChange={(e) => setnameTable(e.target.value)}
            fullWidth
            variant="standard"
            margin="dense"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={hasHourlyRate} // Luôn nhận giá trị từ trạng thái
                onChange={() => sethasHourlyRate(!hasHourlyRate)}
              />
            }
            label="Bàn tính giá theo giờ"
          />

          {hasHourlyRate && (
            <TextField
              autoFocus={true}
              required={true}
              label={"Giá bàn (VNĐ/Phút)"}
              type={"text"}
              value={priceOfMunite}
              onChange={(e) =>
                setpriceOfMunite(validatePriceVND(e.target.value))
              }
              fullWidth
              variant="standard"
              margin="dense"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button className="!bg-[var(--primary)] !text-white" type="submit">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DialogCreateTables.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  items: PropTypes.object, // hoặc PropTypes.arrayOf(PropTypes.object) nếu bạn muốn chi tiết hơn
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default memo(DialogCreateTables);
