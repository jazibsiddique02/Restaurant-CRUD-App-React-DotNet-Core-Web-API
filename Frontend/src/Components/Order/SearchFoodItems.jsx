import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import { SearchTwoTone, PlusOne, ArrowForwardIos } from "@mui/icons-material";

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  flex: 1,
}));

const ListRoot = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: 450,
  overflow: "auto",
  "& li:hover": {
    cursor: "pointer",
    backgroundColor: "#E3E3E3",
  },
  "& li:hover .MuiButtonBase-root": {
    display: "block",
    color: "#000",
  },
  "& .MuiButtonBase-root": {
    display: "none",
  },
  "& .MuiButtonBase-root:hover": {
    backgroundColor: "transparent",
  },
}));

export default function SearchFoodItems(props) {
  // destructuring addFoodItem Function from props parameter
  const { values, setValues } = props;

  let orderedFoodItems = values.orderDetails;

  // contains all food items from db
  const [foodItems, setFoodItems] = useState([]);

  // contains whatever is searched in search bar
  const [searchKey, setSearchKey] = useState("");

  //search list contains filtered array to suggest matching food items
  const [searchList, setSearchList] = useState([]);

  // Food Item properties in orderDetails
  const addFoodItem = (FoodItem) => {
    let x = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      foodItemId: FoodItem.foodItemId,
      quantity: 1,
      foodItemPrice: FoodItem.price,
      foodItemName: FoodItem.foodItemName,
    };

    setValues({
      ...values,
      orderDetails: [...values.orderDetails, x],
    });
  };

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((res) => {
        setFoodItems(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // UseEffect For change in search Key

  useEffect(() => {
    let x = [...foodItems];
    x = x.filter((y) => {
      return (
        y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase()) &&
        orderedFoodItems.every((item) => item.foodItemId != y.foodItemId)
      );
    });
    setSearchList(x);
  }, [searchKey, orderedFoodItems]);

  return (
    <>
      <SearchPaper>
        <SearchInput
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search Food Item"
        />
        <IconButton>
          <SearchTwoTone />
        </IconButton>
      </SearchPaper>

      <ListRoot>
        {searchList.map((item, index) => (
          <ListItem
            key={index}
            onClick={(e) => addFoodItem(item)}
            secondaryAction={
              <IconButton onClick={(e) => addFoodItem(item)}>
                <PlusOne />
                <ArrowForwardIos />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.foodItemName}
              secondary={"$" + item.price}
            />
          </ListItem>
        ))}
      </ListRoot>
    </>
  );
}
