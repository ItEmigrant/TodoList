import {TasksStateType} from "../Todolist";
import {
    addTasksAC,
    changeTasksStatusAC,
    changeTasksTitleAC,
    removeTasksAC,
    RemoveTodolistAC,
    taskReducer
} from "./tasks-reducer";
import {addTodolistAC} from "./todolist-reducer";

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


});

test('new array should be added when new todolist is added', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = RemoveTodolistAC('todolistId2')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined();
})