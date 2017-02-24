(function(angular) {
    'use strict';
    // 存放控制器的独立模块
    angular.module('myApp.controller.main', ['myApp.service.main']).
    controller('MainController', ['$scope',
        '$route',
        '$routeParams',
        '$filter',
        'MainService',
        function($scope, $route, $routeParams, $filter, MainService) {
            // 文本框
            $scope.text = '';
            // 任务列表
            $scope.todos = MainService.getTodos();
            // 未完成条目
            $scope.$watch('todos', function() {
                $scope.remainingItem = $filter('filter')($scope.todos, {
                    completed: false
                }).length;
            }, true);
            // 添加todo
            $scope.addTodo = function() {
                // 校验是否输入为空
                if (!$scope.text) {
                    return;
                }
                MainService.addTodo($scope.text);
                $scope.text = '';
            };

            // 删除todo
            $scope.removeTodo = function(id) {
                MainService.removeTodo(id);
            };

            // 清空已完成
            $scope.clearCompleted = function() {
                var newTodos = MainService.clearCompleted();
                $scope.todos = newTodos;
            };

            // 是否存在已完成
            $scope.hasCompleted = MainService.hasCompleted;

            // 点击全选或取消全选
            $scope.toggleAll = function() {
                MainService.toggleAll();
            };
            $scope.toggle = function() {
                MainService.save();
            };
            // 双击进行编辑状态
            $scope.currentEditingId = -1; // 设置当前编辑状态的id
            $scope.editing = function(id) {
                $scope.currentEditingId = id;
            };
            $scope.save = function() {
                $scope.currentEditingId = -1;
            };

            // 状态筛选
            $scope.selector = {};
            var status = $routeParams.status;
            switch (status) {
                case 'active':
                    $scope.selector = {
                        completed: false
                    };
                    break;
                case 'completed':
                    $scope.selector = {
                        completed: true
                    };
                    break;
                default:
                    $route.updateParams({
                        status: ''
                    });
                    $scope.selector = {};
                    break;
            }
        }
    ]);
})(angular);
