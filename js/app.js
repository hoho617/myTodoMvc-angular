(function(angular) {
    'use strict';

    /*定义一个主模块*/
    var myApp = angular.module('myApp', ['ngRoute', 'myApp.controller.main']);
    /*定义一个路由模块*/
    myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:status?', {
            templateUrl: 'tmpl',
            controller: 'MainController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
    /* myApp.controller('MainController', ['$scope',
         '$location',
         '$routeParams',
         '$route',
         '$filter',
         '$window',
         function($scope, $location, $routeParams, $route, $filter, $window) {
             var storage =
                 // 文本框需要一个模型
                 $scope.text = '';
             // 任务列表也需要一个模型
             $scope.todos = [{
                 id: 1,
                 text: '吃饭',
                 completed: false
             }, {
                 id: 2,
                 text: '睡觉',
                 completed: false
             }, {
                 id: 3,
                 text: '打豆豆',
                 completed: true
             }];

             // function getId() {
             //     var id = Math.random();
             //     for (var i = 0; i < $scope.todos.length; i++) {
             //         if ($scope.todos[i].id === id) {
             //             id = getId();
             //         }
             //     }
             //     return id;
             // }
             // 按回车键，往列表中添加
             $scope.addTodo = function() {
                 $scope.todos.push({
                     id: Math.random(),
                     text: $scope.text,
                     completed: false
                 });
                 $scope.text = '';
             };
             // 根据id进行删除
             $scope.removeTodo = function(id) {
                 for (var i = 0; i < $scope.todos.length; i++) {
                     if ($scope.todos[i].id === id) {
                         $scope.todos.splice(i, 1); // splice(开始删除位置,删除个数)
                         break;
                     }
                 }
             };
             // 清空已完成列表
             $scope.clearCompleted = function() {
                 var newTodos = [];
                 for (var i = 0; i < $scope.todos.length; i++) {
                     if (!$scope.todos[i].completed) {
                         newTodos.push($scope.todos[i]);
                     }
                 }
                 $scope.todos = newTodos;
             };
             // 当有已经完成的事件，clearComplete才会显示
             $scope.hasCompleted = function() {
                 for (var i = 0; i < $scope.todos.length; i++) {
                     if ($scope.todos[i].completed) {
                         return true;
                     }
                 }
                 return false;
             };
             // 当前编辑的元素
             $scope.currentEditingId = -1;
             // 双击进入编辑状态
             $scope.editing = function(id) {
                 $scope.currentEditingId = id; // 当双击的时候，让当前编辑的元素id等于传过来的id
             };
             // 按回车键，编辑的内容会保存,且取消编辑状态
             $scope.save = function() {
                 $scope.currentEditingId = -1;
             };
             // 全选和取消全选
             var now = true;
             $scope.toggleAll = function() {
                 for (var i = 0; i < $scope.todos.length; i++) {
                     $scope.todos[i].completed = now;
                 }
                 now = !now;
             };
             // 点击active和completed相应的筛选--根据todos里面的completed的值
             $scope.selector = {}; // 定义当前筛选的是一个对象，其值有{},{completed:true},{completed:false}
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

             // filter是模糊匹配，使用自定义比较函数
             $scope.equalsCompare = function(source, target) {
                 console.log(source);
                 console.log(target);
                 return source === target;
             }

             // 未完成项数量
             $scope.$watch('todos', function() {
                 $scope.remainingItem = $filter('filter')($scope.todos, {
                     completed: false
                 }).length;
             }, true)
         }
     ]);*/
    /*注册一个主控制器
	todoApp. controller('MainController',['$scope','$location',function($scope,$location){
	   // 文本框需要一个模型
		$scope.text = '';
	     // 任务列表也需要一个模型
		$scope.todos = [
			{id : 0.111,text : '吃饭',completed : false},
			{id : 9.222,text : '睡觉',completed : false},
			{id : 0.1234,text : '打豆豆',completed : true}
		];
		function getId() {
			var id = Math.random();
			for(var i = 0;i < $scope.todos.length;i++) {
				if($scope.todos[i].id === id) {
					id = getId();
				}
			}
			return id;
		}
		// 按回车键，往列表中添加
		$scope.add = function () {
			$scope.todos.push({
				id : getId(),
				text : $scope.text,
				completed : false
			});
			$scope.text = '';
		};
		// 点击x按钮
		$scope.remove = function (id) {
			for(var i = 0;i <  $scope.todos.length;i++) {
				if($scope.todos[i].id === id) {
					$scope.todos.splice(i,1); // splice(开始删除位置,删除个数)
					break;
				}
			}
		};
		// 清空已完成列表
	$scope.clear = function () {
		var newTodos = [];
	for(var i = 0;i < $scope.todos.length;i++) {
		if(!$scope.todos[i].completed) {
			newTodos.push($scope.todos[i]);
		}
	}
		$scope.todos = newTodos;
	};
		// 当有已经完成的事件，clearComplete才会显示
		$scope.existCompleted = function () {
				for(var i = 0;i < $scope.todos.length;i++) {
					if($scope.todos[i].completed) {
						return true;
					}
				}
			return false;
		};
		// 当前编辑的元素
		$scope.currentEditingId = -1;
		// 双击进入编辑状态
       $scope.editing = function (id) {
		   $scope.currentEditingId = id; // 当双击的时候，让当前编辑的元素id等于传过来的id
	   };
		// 按回车键，编辑的内容会保存,且取消编辑状态
		$scope.save = function () {
			$scope.currentEditingId = -1;
		};
		// 全选和取消全选
		var now = true;
		$scope.checkAll = function () {
			for(var i = 0;i < $scope.todos.length;i++) {
				$scope.todos[i].completed = now;
			}
			now = ! now;
		};
		// 点击active和completed相应的筛选--根据todos里面的completed的值
		 $scope.selector={};// 定义当前筛选的是一个对象，其值有{},{completed:true},{completed:false}
		// 由于锚点值的变化不会影响到当前页面的刷新，故从地址栏中取出的锚点值不会改变，通过监听锚点值的做法来得到相应的页面显示
		// $watch只能监视$scope上的成员--此处需要监视的是地址栏中取出来的锚点值
		$scope.$location = $location;
		$scope.$watch('$location.path()', function (now, old) {
			switch (now) {
				case '/active':
					$scope.selector={completed : false};
					break;
				case '/completed':
					$scope.selector={completed : true};
					break;
				default:
					$scope.selector={};
					break;
			}
		});
		// filter是模糊匹配，使用自定义比较函数
		$scope.equalsCompare = function (source, target) {
			console.log(source);
			console.log(target);
			return source === target;
		}

	}]);*/
})(angular);
