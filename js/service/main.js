(function(angular) {
    'use strict'
    // 服务模块 -- 中间存放业务逻辑
    angular.module('myApp.service.main', []).
    service('MainService', ['$window', function($window) {
        var storage = $window.localStorage;
        // 私有成员--任务列表数据
        var todos = storage['myTodoList'] ? JSON.parse(storage['myTodoList']) : [];
        // 私有方法-保存todos数据
        this.save = function() {
            storage['myTodoList'] = JSON.stringify(todos);
        };
        // 将任务列表数据暴露给控制器
        this.getTodos = function() {
            return todos;
        };

        //添加数据
        this.addTodo = function(text) {
            todos.push({
                id: Math.random(),
                text: text,
                completed: false
            });
            this.save();
        };

        // 删除数据
        this.removeTodo = function(id) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    todos.splice(i, 1);
                }
            };
            this.save();
        };

        // 清空已完成
        this.clearCompleted = function() {
            var newTodos = [];
            for (var i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    newTodos.push(todos[i]);
                }
            }
            todos = newTodos;
            this.save();
            // 此时我们将todos指向了一个新的地址
            return todos;
        };

        // 是否存在已完成
        this.hasCompleted = function() {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    return true;
                }
            }
            return false;
        };

        // 点击全选或取消全选
        var now = true;
        this.toggleAll = function() {
            for (var i = 0; i < todos.length; i++) {
                todos[i].completed = now;
            }
            now = !now;
            this.save();
        };
    }]);
})(angular);
