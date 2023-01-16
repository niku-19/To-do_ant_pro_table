import React, { useEffect, useState } from "react";
import { Table, Modal, Input } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [filter , setFilter] = useState('')
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [givenUserTime, setGivenUserTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      timeStamp: "1- 12:12:12",
      title: "Task 1",
      desc: "Task 1 Description",
      dueDate: "12-12-2021",
      Status: "Open",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "Timestamp",
      dataIndex: "timeStamp",
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "desc",
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "dueDate",
    },
    {
      key: "5",
      title: "Status",
      render: () => {
        return (
          <>
            <div className="select">
              <select>
                <option value="Open">Open</option>
                <option value="Working">Working</option>
                <option value="Done">Done</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </>
        );
      },
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 22 }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const data = [...dataSource];
    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(filter.toLowerCase())
      );
    });
    setDataSource(filteredData);
  }, [filter])

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const onDescChangeHandler = (e) => {
    setDesc(e.target.value);
  };
  const onTimeChangeHanler = (e) => {
    setGivenUserTime(e.target.value);
  };
  const onSelectChangeHandler = (e) => {
    const sortedData = [...dataSource];
    if (e.target.value === "Timestam") {
      sortedData.sort((a, b) => {
        return a.timeStamp < b.timeStamp ? 1 : -1;
      });
    }

    if (e.target.value === "title") {
      sortedData.sort((a, b) => {
        return a.title < b.title ? 1 : -1;
      });
    }

    if (e.target.value === "Descriptions") {
      sortedData.sort((a, b) => {
        return a.desc < b.desc ? 1 : -1;
      });
    }

    if (e.target.value === "Due Date") {
      sortedData.sort((a, b) => {
        return a.dueDate < b.dueDate ? 1 : -1;
      });
    }
    setDataSource(sortedData);
  };

  const onSelectChangeHandlerAscending = (e) => {
    const sortedData = [...dataSource];
    if (e.target.value === "Timestam") {
      sortedData.sort((a, b) => {
        return a.timeStamp > b.timeStamp ? 1 : -1;
      });
    }

    if (e.target.value === "title") {
      sortedData.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      });
    }

    if (e.target.value === "Descriptions") {
      sortedData.sort((a, b) => {
        return a.desc > b.desc ? 1 : -1;
      });
    }

    if (e.target.value === "Due Date") {
      sortedData.sort((a, b) => {
        return a.dueDate > b.dueDate ? 1 : -1;
      });
    }
    setDataSource(sortedData);
  };

  const onfilterChangeHandler = e => {
    setFilter(e.target.value)
  }

  const onAddStudent = (e) => {
    e.preventDefault();
    const currentTime = `${new Date().getDate()}- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    const newStudent = {
      timeStamp: currentTime,
      title: title,
      desc: desc,
      dueDate: givenUserTime,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter(
            (student) => student.timeStamp !== record.timeStamp
          );
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <>
      <div className="App">
        <h1>What's the Plan for Today?</h1>
        <div className="container">
          <input
            placeholder="Add a todo"
            value={title}
            name="text"
            onChange={onTitleChangeHandler}
            className="todo-input"
          />
          <input
            placeholder="Add a date"
            type="date"
            name="time"
            value={givenUserTime}
            onChange={onTimeChangeHanler}
            className="todo-input"
          />
          <br />
          <textarea
            placeholder="Add a date"
            name="description"
            minLength={5}
            maxLength={100}
            className="todo-input"
            value={desc}
            onChange={onDescChangeHandler}
          />
          <button className="todo-button" onClick={onAddStudent}>
            {" "}
            Add New To-do{" "}
          </button>
        </div>
        <div className="container">
          <label htmlFor="forSort">Sort in Descending</label>
          <select
            name="forSort"
            className="select"
            onChange={onSelectChangeHandler}
          >
            <option value="Timestam">Timestam</option>
            <option value="title">title</option>
            <option value="Descriptions">Descriptions</option>
            <option value="OverDue">OverDue</option>
          </select>
          <label htmlFor="forSort">Sort in Ascending</label>
          <select
            name="forSort"
            className="select"
            onChange={onSelectChangeHandlerAscending}
          >
            <option value="Timestam">Timestam</option>
            <option value="title">title</option>
            <option value="Descriptions">Descriptions</option>
            <option value="OverDue">OverDue</option>
          </select>
        </div>
        <div className="container">
          <input name="filter" className="todo-input" type="text" onChange={onfilterChangeHandler} placeholder="filter" />
        </div>
        <header className="App-header">
          <br />
          <Table columns={columns} dataSource={dataSource}></Table>
          <Modal
            title="Edit Student"
            visible={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              setDataSource((pre) => {
                return pre.map((student) => {
                  if (student.id === editingStudent.id) {
                    return editingStudent;
                  } else {
                    return student;
                  }
                });
              });
              resetEditing();
            }}
          >
            <Input
              value={editingStudent?.title}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, title: e.target.value };
                });
              }}
            />
            <Input
              value={editingStudent?.desc}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, desc: e.target.value };
                });
              }}
            />
            <Input
              value={editingStudent?.givenUserTime}
              type="date"
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, dueDate: e.target.value };
                });
              }}
            />
          </Modal>
        </header>
      </div>
    </>
  );
}

export default App;
