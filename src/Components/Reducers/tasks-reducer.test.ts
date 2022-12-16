import {TasksStateType} from "../Todolist";
import {addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, taskReducer} from "./tasks-reducer";

test("correct tasks should be deleted from correct array", () => {


    const startState: TasksStateType = {


        "todolistId1":
            [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
        "todolistId2":
            [
                {id: "1", title: "Milk", isDone: true},
                {id: "2", title: "React Book", isDone: true}
            ]
    };

    const action = removeTasksAC("1", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1":
            [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
        "todolistId2":
            [
                {id: "2", title: "React Book", isDone: true}
            ]

    });

});

test("correct tasks should be added from correct array", () => {


    const startState: TasksStateType = {

        "todolistId1":
            [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
        "todolistId2":
            [
                {id: "1", title: "Milk", isDone: true},
                {id: "2", title: "React Book", isDone: true}
            ]
    };

    const action = addTasksAC("juice", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);

})

test("correct tasks should be changed from correct array", () => {


    const startState: TasksStateType = {

        "todolistId1":
            [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
        "todolistId2":
            [
                {id: "1", title: "Milk", isDone: true},
                {id: "2", title: "React Book", isDone: true}
            ]
    };

    const action = changeTasksStatusAC("2", false, "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);

})

test("correct tasks should be changed title from correct array", () => {

    const startState: TasksStateType = {

        "todolistId1":
            [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
        "todolistId2":
            [
                {id: "1", title: "Milk", isDone: true},
                {id: "2", title: "React Book", isDone: true}
            ]
    };

    const action = changeTasksTitleAC("1", "Rust", "todolistId1");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][0].title).toBe("Rust");
    expect(endState["todolistId1"].length).toBe(2);


})