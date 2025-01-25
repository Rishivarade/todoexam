import React, { useEffect, useState } from 'react'
import axios from "axios"
import {MdDeleteForever, MdModeEdit } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

const List = () => {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [listID, setListID] = useState(null);
    const [edit, setEdit] = useState("");

    // get list
    const getTodo = async () => {
        try {
            const res = await axios.get("http://localhost:3000/todo/");
            console.log(res.data.List);
            setList(res.data.List);
        } catch (error) {
            console.error(error);
        }
    };

    // create todo
    const handleCreate = async () => {
        try {
            await axios.post("http://localhost:3000/todo/create", { title });
            getTodo();
            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    // delete todo
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todo/delete/${id}`);
            getTodo();
        } catch (err) {
            console.error(err);
        }
    };

    // edit todo
    const handleEdit = (el, id) => {
        setEdit(el.title);
        setListID(id);
    };

    // update todo
    const handleUpdate = async () => {
        try {
            await axios.patch(`http://localhost:3000/todo/edit/${listID}`, { title: edit });
            getTodo();
            setEdit("");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <div className="todolist" style={{ border: "4px solid violet", padding: "20px 80px",backgroundColor:"lightgreen",borderRadius:"10px" }}>
            <h1>Todo List</h1>

            {/* create todo */}
            <div className="create" style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                    value={title}
                    name="title"
                    style={{ padding: "10px", width: "80%", borderRadius: "10px" ,backgroundColor:"whitesmoke"}}
                    type="text"
                    placeholder="Enter Todo"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button style={{ padding: "10px",backgroundColor:"black",color:"whitesmoke" ,marginLeft:"10px"}} onClick={handleCreate}>
                    Create <IoCreateOutline />
                </button>
            </div>

            {/* update todo */}
            <h1 style={{ fontSize: "30px" }}>Update Todo List title</h1>
            <div className="create" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <input
                    value={edit}
                    name="title"
                    style={{ padding: "10px", width: "80%", borderRadius: "10px" ,backgroundColor:"whitesmoke"}}
                    type="text"
                    placeholder="Enter Todo"
                    onChange={(e) => setEdit(e.target.value)}
                />
                <button style={{ padding: "10px",backgroundColor:"black",color:"whitesmoke",marginLeft:"10px" }} onClick={handleUpdate}>
                    Update <IoCreateOutline />
                </button>
            </div>

            {/* get todo list */}
            <div className="allTodo">
                {list.map((el) => (
                    <div
                        key={el._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "2px solid black",
                            paddingLeft: "40px",
                            paddingRight: "30px",
                            marginTop: "20px", borderRadius: "10px",backgroundColor:"whitesmoke"
                        }}
                    >
                        <p style={{ margin: "10px", border: "1px solid black", padding: "15px", borderRadius: "10px", fontSize: "20px", borderRadius: "10px",fontWeight:"600" }}>
                            {el.title}
                        </p>
                        <button
                            style={{ margin: "10px", border: "1px solid black",backgroundColor:"black",color:"whitesmoke", }}
                            onClick={() => handleEdit(el, el._id)}
                        >
                            <MdModeEdit />
                        </button>
                        <button
                            style={{ margin: "10px", border: "1px solid black",backgroundColor:"black",color:"whitesmoke", }}
                            onClick={() => handleDelete(el._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
