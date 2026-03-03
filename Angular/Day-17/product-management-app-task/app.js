var app = angular.module('ProductManagementApp', [])

app.controller('MainController', function($scope, ProductService) {
    $scope.products = []
    $scope.sortBy = ''
    $scope.loading = false
    $scope.errorMessage = ''
    $scope.updatingProduct = false
    $scope.tempProduct = {}


    $scope.getProducts = function() {
        $scope.loading = true

        ProductService.getProducts().then(function(response) {
            $scope.products = response.data
            $scope.errorMessage = ''
        })
        .catch(function(){
            $scope.errorMessage = 'failed to load products'
        })
        .finally(function(){
            $scope.loading = false;
        });
    }

    $scope.getProducts()

    $scope.addProduct = function() {
        $scope.validateProduct()
        if ($scope.validationMessage)
            return
        var product = {
            title: $scope.title,
            price: $scope.price,
            gender: $scope.gender,
            image_url: 'imageurl'
        }
        ProductService.addProduct(product).then(function(response) {
            $scope.getProducts()
            $scope.title = ''
            $scope.price = ''
            $scope.gender = ''
            $scope.validationMessage = ''
        })
    };

    $scope.updateProduct = function() {
        $scope.validateProduct()
        if ($scope.validationMessage)
            return
        var product = {
            title: $scope.title,
            price: $scope.price,
            gender: $scope.gender,
            image_url: 'imageurl'
        }
        ProductService.updateProduct($scope.tempProduct, product).then(function() {
            $scope.getProducts()
            $scope.title = ''
            $scope.price = ''
            $scope.gender = ''
            $scope.validationMessage = ''
            $scope.updatingProduct = false
            $scope.tempProduct = {}
        })
    }

    $scope.editProduct = function(product) {
        $scope.updatingProduct = true
        $scope.tempProduct = product
        $scope.title = product.title
        $scope.price = product.price
        $scope.gender = product.gender
    }

    $scope.deleteProduct = function(product) {
        ProductService.deleteProduct(product).then(function() {
            $scope.getProducts()
        })
    }

    $scope.validateProduct = function() {
        if (!$scope.title) {
            $scope.validationMessage = 'title is required'
        } else if ($scope.title.length < 3) {
            $scope.validationMessage = 'title must be atleast 3 chars'
        } else if (!$scope.price) {
            $scope.validationMessage = 'price is required'
        } else if ($scope.price <= 0) {
            $scope.validationMessage = 'price must be greater than 0'
        } else if (!$scope.gender) {
            $scope.validationMessage = 'gender is required'
        } else {
            $scope.validationMessage = ''
        }
    }
})

app.service('ProductService', function($http) {
    const apiLink = "https://ajuxbtifwipqmwmsrqcg.supabase.co/rest/v1/"
    const apiKey = "sb_publishable_vzpgbW6T18bn5RyHdx66qw_pdeMQswL"
    const headers = {
            "apiKey": apiKey,
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        }

    this.getProducts = function() {
        return $http.get(apiLink + "products?select=*", {
            headers: headers
        })
    }

    this.addProduct = function(product) {
        return $http.post(apiLink + "products", product, { headers: headers })
    }

    this.deleteProduct = function(product) {
        return $http.delete(apiLink + "products?id=eq." + product.id, { headers: headers })
    }

    this.updateProduct = function(product, updatedProduct) {
        return $http.patch(apiLink + "products?id=eq." + product.id, updatedProduct, { headers: headers })
    }
})
