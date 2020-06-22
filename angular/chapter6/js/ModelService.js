var model = angular.module('nameList.model', []);

    function Guest(name, phone) {
        this.name = name;
        this.phone = phone;
        this.state = Guest.INVITE;
    }

    Guest.INVITE = '邀请中';
    Guest.REFUSE = '已拒绝';
    Guest.ALL = '全部';


    Guest.prototype.accept = function () {
        this.state = Guest.ACCEPT;
    }

    Guest.prototype.refuse = function () {
        this.state = Guest.REFUSE;
    }

    model.factory('modelService', function () {
        var guestList = {
            list: [],
            add: function (name, phone) {
                var isok = true;
                isok = !!(isok && name && phone);
                if (!isok) {
                    return {
                        code: 1,
                        guest: null
                    }
                }
            //添加输入的内容
                var guest = new Guest(name, phone);
                this.list.push(guest);
                return {
                    code: 0,
                    guest: guest
                }
            },
        //删除当前选中的这条信息
            remove: function (guest) {
                this.list = this.list.filter(function (item) {
                    return guest.phone != item.phone;
                })
            },
    

//显示所有邀请后的信息
          getList:function(state){
               if (state==Guest.ALL){
                 return this.list.filter(function(){
                       return true;
                  })
              }
              return this.list.filter(function (guest){
                  return guest.state==state;
               })
           }
        }
        return guestList;
    })