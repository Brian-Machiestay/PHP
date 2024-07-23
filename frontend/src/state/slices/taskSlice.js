import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/axiosConfig";

//console.log('this code was called at this time');

const initialState = {
    userSearch: '',
    tasks: "",
    taskPosted: {},
    postingTask: false,
    postingTaskError: null
}

export const postTask = createAsyncThunk(
    'task/postTask',
    async (data) => {
        const dt = await Axios.post('/admin/tasks', data);
        console.log(dt['data']);
        return dt['data'];
    }
)

export const searchUsers = createAsyncThunk(
    'task/searchUsers',
    async (data) => {
        const dt = await Axios.get(`/admin/search/profile?name=${data}`);
        console.log(dt['data']);
        return dt['data'];
    }
)


export const getTasks = createAsyncThunk(
    'task/getTasks',
    async () => {
        const dt = await Axios.get(`/admin/tasks`);
        console.log(dt['data']);
        return dt['data'];
    }
)



const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearTaskPosted: (state) => { state.taskPosted = {} },
        updateTaskID: (state, action) => {
            const id = action.payload.id
            state.tasks[id] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postTask.pending, (state) => { state.postingTask = true; state.taskPosted = 'loading'; })
        builder.addCase(postTask.fulfilled, (state, action) => {
            state.postingTask = false
            state.taskPosted = action.payload
            state.tasks[action.payload.id] = action.payload
        })
        builder.addCase(postTask.rejected, (state, action) => {
            state.taskPosted = 'error';
            state.postingTask = false
            state.postingTaskError = action.error.message
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            //console.log(action)
            state.tasks = action.payload;
        })
        builder.addCase(getTasks.pending, (state) => {state.tasks = 'loading'})
        builder.addCase(getTasks.rejected, (state) => {
            state.tasks = null
        })

        builder.addCase(searchUsers.pending, (state) => {state.userSearch = 'loading'});
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.userSearch = action.payload['result']
        })
        builder.addCase(searchUsers.rejected, (state) => {state.userSearch = 'error'})
    }
})


export default taskSlice.reducer;
export const { clearTaskPosted, updateTaskID, addNewTask } = taskSlice.actions;