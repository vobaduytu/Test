let todos = {};

todos.showListWork = function(page) {
    $.ajax({
        url: "http://localhost:8080/api/todos?page=" + page,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#showListWorks').empty();
            let totalPage = parseInt(data.totalPages);
            let num = parseInt(data.pageable.pageNumber);
            console.log(totalPage);
            $('.pagination').empty('');
            if (num != 0) {
                $('.pagination').append(`<li class="page-item" ><a class="page-link" href="#" onclick="todos.showListWork(${num} -1)">Trước</a></li>`)
            }
            for (let i = 0; i < totalPage; i++) {
                if (data.pageable.pageNumber === i) {
                    $('.pagination').append(`<li class="page-item "><a class="page-link" href="#">${i + 1}</a></li>`);
                }
            }
            if (num < totalPage - 1) {
                $('.pagination').append(`<li class="page-item"><a class="page-link" href="#" onclick="todos.showListWork(${num} +1)">Sau</a></li>`);
            }

            if (num == 0) {
                stt = 0;
            } else {
                stt = (num++) * 6;
            }
            $.each(data.content, function (i, v) {
                i = stt
                $('#showListWorks').append(
                    "<tr>" +
                    "<td>" + ++i + "</td>" +
                    "<td>" + v.name + "</td>" +
                    "<td>" + v.startDate + "</td>" +
                    "<td>" + v.endDate + "</td>" +
                    "<td>" + v.status + "</td>" +
                    "<td>" +
                    "<a  href='#' data-toggle='tooltip' title='Chỉnh Sửa' onclick='todos.showUpdate(" + v.id + ")'  <i class=\"fas fa-edit\"></i></a>" +
                    "<a href='#' data-toggle='tooltip' title='Xóa' style='padding-left: 35px' ><i onclick='todos.delete(" + v.id + ")' class=\"fas fa-trash-alt\"></i></a>" +
                    "</td>" +
                    "</tr>"
                );
                stt = i
            })
        }

    })
}

todos.showAdd = function (){
    $('#formDemo')[0].reset();
    $('#id').val("");
    $('#myModal').modal('toggle');
}


todos.showUpdate = function (idTodo){
    $.ajax({
        url: `http://localhost:8080/api/todos/${idTodo} `,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#id').val(data.id);
            $('#nameWork').val(data.name);
            $('#startingDate').val(data.startDate);
            $('#EndingDate').val(data.endDate);
            $('#status').val(data.status);
            $('#myModal').modal("toggle");
        }
    });
}
todos.save = function (){
    if (!($('#id').val() === "")){
        let todo = {};
        todo.id = $('#id').val();
        todo.name = $('#nameWork').val();
        todo.startDate = $('#startingDate').val();
        todo.endDate = $('#EndingDate').val();
        todo.status = $('#status').val();
        console.log(todo);
        $.ajax({
            url: `http://localhost:8080/api/todos/${todo.id}`,
            method: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(todo),
            success: function (data) {
                console.log("update done");
                $('#myModal').modal('hide');
                todos.showListWork(0);

            },
            error: function (data) {

            }
        });
    }
    else {
        let todo = {};
        todo.name = $('#nameWork').val();
        todo.startDate = $('#startingDate').val();
        todo.endDate = $('#EndingDate').val();
        todo.status = $('#status').val();
        console.log(todo);
        $.ajax({
            url: `http://localhost:8080/api/todos`,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(todo),
            success: function (data) {
                console.log("add done");
                $('#myModal').modal('hide');
                todos.showListWork(0);

            },
            error: function (data) {

            }
        });
    }
}

todos.delete = function (id) {
    bootbox.confirm({
        message: "Bạn có chắc muốn xóa không?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times">Không</i> '
            },
            confirm: {
                label: '<i class="fa fa-check"> Có</i>'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:8080/api/todos/" + id,
                    method: "DELETE",
                    contentType: 'json',
                    success: function (data) {
                        todos.showListWork(0);
                    }
                });
            }
        }
    });
}
$(document).ready(function () {
    todos.showListWork(0);
});