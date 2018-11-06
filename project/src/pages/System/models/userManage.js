import { Modal } from 'antd';
import { 
  getAllUsers,
  deleteUser,
  addUser,
  modifyUser,
  modifyLock,
} from '@/services/userManage';
export default {
    namespace:'userManage',
    state:{
        users:[],
    },
    effects:{
        // 获取所有用户
        *getAllUsers(_, { call, put }){
            const response = yield call(getAllUsers);
            if(response.status==="ok"){
                yield put({
                    type:"appearAllUsers",
                    payload:response.data,
                });
            }
            else{
                Modal.error({
                    title:"This is an error message",
                    content:'获取用户列表失败',
                });
            }
        },
        // 删除用户
        *deleteUser({ payload }, { call, put }){
            const response = yield call(deleteUser, payload);
            if(response.status==="ok"){
                yield put({
                    type:'delUser',
                    payload,
                });
                Modal.success({title:'This is a success message',content:'删除用户成功'});
            }
            else{
                Modal.error({title:"This is an error message",content:"删除用户失败"});
            }
        },
         //编辑用户
         *editUser({ payload }, {call, put } ){
            const response = yield call(modifyUser, payload);
            if(response.status==="ok"){
                yield put({
                    type:'modifyUser',
                    payload,
                });
                Modal.success({title:'This is a success message',content:'用户信息修改成功'});
            }
            else{
                Modal.error({title:"This is an error message",content:"用户信息修改失败"});
            }
        },
        //新增用户
        *newUser({ payload }, {call, put } ){
            const response = yield call(addUser, payload);
            if(response.status==="ok"){
                yield put({
                    type:'addUser',
                    payload,
                });
                Modal.success({title:'This is a success message',content:'添加用户成功'});
            }
            else{
                Modal.error({title:"This is an error message",content:"添加用户失败"});
            }
        },
        //新增用户
        *modifyLock({ payload }, {call, put } ){
            const response = yield call(modifyLock, payload);
            if(response.status==="ok"){
                if(payload.locked){
                    yield put({
                        type:'cancelLock',
                        payload,
                    });
                    Modal.success({title:'This is a success message',content:'用户解除锁定成功'});
                }
                else{
                    yield put({
                        type:'addLock',
                        payload,
                    });
                    Modal.success({title:'This is a success message',content:'锁定用户成功'});
                }
                
            }
            else{
                Modal.error({title:"This is an error message",content:"锁定用户失败"});
            }
        },



    },
    reducers:{
        //显示所有用户
        appearAllUsers(state, action){
            return {
                ...state,
                users:action.payload,
            };
        },
        //删除用户：修改state中的用户数据
        delUser(state, action){
            const username=action.payload;
            const { users } = state;
            let newUsers=[...users];
            newUsers=newUsers.filter((item)=>item.username!==username);
            return {
                ...state,
                users:newUsers,
            };
        },
        //解除锁定
        cancelLock(state, action){
            const { users } = state;
            let newUsers=[...users];
            newUsers=newUsers.map((item)=>{
                if(item.username===action.payload.username){
                    item.locked=false;
                }
                return item;
            });
            return {
                ...state,
                users:newUsers,
            };
        },
        //添加锁定
        addLock(state, action ){
            const { users } = state;
            let newUsers=[...users];
            newUsers=newUsers.map((item)=>{
                if(item.username===action.payload.username){
                    item.locked=true;
                }
                return item;
            });
            return {
                ...state,
                users:newUsers,
            };
        },
        //编辑用户
        modifyUser(state, action ){
            const { users } = state;
            const { payload } = action;
            let newUsers = [...users];
            newUsers = newUsers.map((item) => {
                if(item.username===payload.username){
                    item={...item, ...payload};
                }
                return item;
            });
            return {
                ...state,
                users: newUsers,
            };

        },
        //新增用户
        addUser(state, action ){
            const { users } = state;
            let newUsers = [...users];
            newUsers.push(action.payload);
            console.log(newUsers);
            return {
                ...state,
                users: newUsers,
            };
        },


    },
    subscriptions:{

    }
}