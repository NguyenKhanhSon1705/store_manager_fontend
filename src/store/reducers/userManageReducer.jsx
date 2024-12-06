import actionTypes from "../actions/actionTypes"

const initState = {
  listUser: [],
  listUserOfTree: [],
  listUserOfList: [],
  userDetails: {},
  message: "",
  update: false,
  loading: false,
}

const userManage = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_OF_TREE: {
      return {
        listUser: action.payload.data,
        loading: action.payload.loading
      }
    }
    case actionTypes.GET_USER_OF_TREE_BY_ID: {
      return {
        ...state,
        listUser: mergeTreeData(state.listUser, action.payload.parentId, action.payload.data),
        loading: action.payload.loading
      }
    }
    case actionTypes.GET_USER_OF_LIST: {
      return {
        listUser: action.payload.data,
        loading: action.payload.loading
      }
    }
    case actionTypes.GET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload.data,
        loading: action.payload.loading
      }
    }
    case actionTypes.CREATE_USER: {

      let items = [action.payload.data ,...state.listUser.items ]
      let totalCount = state.listUser.totalCount + 1 
      return {
        ...state,
        listUser: {
          ...state.listUser,
          items,
          totalCount
        },
        message: action.payload.message,
        update: action.payload.update,
      }
    }
    case actionTypes.UPDATE_USER: {
      return {
        ...state,
        userDetails: action.payload.data,
        message: action.payload.message,
        update: action.payload.update,
      }
    }

    case actionTypes.LOOK_USER: {
      return {
        ...state,
        listUser: removeNodeById(state.listUser, action.payload.data),
        message: action.payload.message,
        update: action.payload.update,
      }
    }
    case actionTypes.LOADING_USER: {
      return {
        ...state,
        loading: action.payload.loading,
        update: action.payload.update
      }
    }
    case actionTypes.ERROR_USER: {
      console.log(action);
      
      return {
        ...state,
        message: action.payload.message,
        loading: action.payload.loading,
        update: action.payload.update
      }
    }
    default:
      return state
  }
}

function removeNodeById(tree, idToRemove) {
  // Hàm đệ quy để loại bỏ phần tử có ID chỉ định
  const recursiveRemove = (nodes, idToRemove) => {
    return nodes.map(node => {
      if (node.id === idToRemove) {
        // Nếu phần tử trùng ID, không trả lại nó
        return null;
      }

      // Duyệt qua các node con và loại bỏ ID chỉ định nếu có
      const children = tree.filter(n => n.managerID === node.id);
      const updatedChildren = recursiveRemove(children, idToRemove);

      // Trả lại phần tử hiện tại nhưng có cập nhật children (nếu có)
      return {
        ...node,
        children: updatedChildren
      };
    }).filter(Boolean); // Loại bỏ các phần tử null
  };

  // Duyệt qua toàn bộ tree và bắt đầu loại bỏ
  return recursiveRemove(tree, idToRemove);
}


const mergeTreeData = (tree, parentId, children) => {
  if (!parentId) return children;  // If root, return the new tree

  return tree.map((node) => {
    if (node.id === parentId) {
      return { ...node, children };
    } else if (node.children) {
      return { ...node, children: mergeTreeData(node.children, parentId, children) };
    }
    return node;
  });
};
export default userManage