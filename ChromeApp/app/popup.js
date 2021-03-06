// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var BookmarkManager = {
    Init: function () {
        this.bookmarkData.length = 0;

        function collectLinks(bookmark) {
            if (bookmark.children) {
                for (var i = 0; i < bookmark.children.length ; i++)
                    collectLinks(bookmark.children[i])
            }
            BookmarkManager.AddItemByBookmarkNode(bookmark)
        }
        chrome.bookmarks.getTree(function (_bookmarks) {
            collectLinks(_bookmarks[0]);
        });
    },
    CreateItem: function (_id, _url, _title, _parentId, _dataAdded) {
        var _bookmarkItem = {};
        _bookmarkItem.id = _id;
        _bookmarkItem.url = _url;
        _bookmarkItem.title = _title,
        _bookmarkItem.parentId = _parentId;
        _bookmarkItem.dateAdded = _dataAdded;
        return _bookmarkItem;
    },

    CreateItemByBookmarkNode: function (_bookmarkNode) {
        var _bookmarkItem = {};
        _bookmarkItem.id = _bookmarkNode.id;
        _bookmarkItem.url = _bookmarkNode.url;
        _bookmarkItem.title = _bookmarkNode.title,
        _bookmarkItem.parentId = _bookmarkNode.parentId;
        _bookmarkItem.dateAdded = _bookmarkNode.dateAdded;

        return _bookmarkItem;
    },

    AddItem: function (_id, _url, _title, _parentId, _dataAdded) {
        var _bookmarkItem = {};
        _bookmarkItem.id = _id;
        _bookmarkItem.url = _url;
        _bookmarkItem.title = _title,
        _bookmarkItem.parentId = _parentId;
        _bookmarkItem.dateAdded = _dataAdded;

        this.bookmarkData.push(_bookmarkItem);
    },

    AddItemByBookmarkNode: function (_bookmarkNode) {
        var _bookmarkItem = {};
        _bookmarkItem.id = _bookmarkNode.id;
        _bookmarkItem.url = _bookmarkNode.url;
        _bookmarkItem.title = _bookmarkNode.title,
        _bookmarkItem.parentId = _bookmarkNode.parentId;
        _bookmarkItem.dateAdded = _bookmarkNode.dateAdded;

        this.bookmarkData.push(_bookmarkItem);

    },
    DeleteItemByTitle: function (_title) {
        var i = 0;
        var len = this.bookmarkData.length;
        var deleteItemCount = 0;
        for (; i < len; ++i) {
            var it = this.bookmarkData[i];
            if (it.title == _title) {
                this.bookmarkData.splice(i, 1);
                len = this.bookmarkData.length;
                --i;
                ++deleteItemCount;
            }
        }
        return deleteItemCount;
    },
    DeleteItemByUrl: function (_url) {
        var i = 0;
        var len = this.bookmarkData.length;
        var deleteItemCount = 0;
        for (; i < len; ++i) {
            var it = this.bookmarkData[i];
            if (it.url == _url) {
                this.bookmarkData.splice(i, 1);
                len = this.bookmarkData.length;
                --i;
                ++deleteItemCount;
            }
        }
        return deleteItemCount;
    },
    DeleteItemByItem: function (_item) {
        var i = 0;
        var len = this.bookmarkData.length;
        var deleteItemCount = 0;
        for (; i < len; ++i) {
            var it = this.bookmarkData[i];
            if (it == _item) {
                this.bookmarkData.splice(i, 1);
                len = this.bookmarkData.length;
                --i;
                ++deleteItemCount;
            }
        }
        return deleteItemCount;
    },
    DeleteItemByItemId: function (_id) {
        var i = 0;
        var len = this.bookmarkData.length;
        var deleteItemCount = 0;
        for (; i < len; ++i) {
            var it = this.bookmarkData[i];
            if (it.id == _id) {
                this.bookmarkData.splice(i, 1);
                len = this.bookmarkData.length;
                --i;
                ++deleteItemCount;
            }
        }
        return deleteItemCount;
    },

    DeleteItemByBookmarkNode: function (_bookmarkNode) {

        var i = 0;
        var len = this.bookmarkData.length;
        var deleteItemCount = 0;
        for (; i < len; ++i) {
            var it = this.bookmarkData[i];
            if (it.url == _bookmarkNode.url && it.title == _bookmarkNode.title) {
                this.bookmarkData.splice(i, 1);
                len = this.bookmarkData.length;
                --i;
                ++deleteItemCount;
            }
        }
        return deleteItemCount;
    },

    GetRepeatItems: function () {
        this.SortByUrl();
        var len = this.bookmarkCount();
        var i = 0;
        var temp = { url: "" };
        var firstTime = true;
        this.repeatItems.length = 0;

        for (; i < len; ++i) {
            if (this.bookmarkData[i]) {
                if (temp.url && this.bookmarkData[i].url == temp.url) {
                    if (firstTime) {
                        this.repeatItems.push(temp);
                        firstTime = false;
                    }
                    this.repeatItems.push(this.bookmarkData[i]);
                }
                else {
                    temp = this.bookmarkData[i];
                    firstTime = true;
                }
            }
        }
        console.log("repeat items count is " + this.repeatItems.length);

    },
    FindItemsByUrl: function (_url) {
        var result = new Array;
        this.bookmarkData.find(function (item) {
            if (item.url == _url) {
                result.push(item);
            }
        });
        console.log(item);
        return item;
    },

    FindItemsByTitle: function (_title) {
        var result = new Array;
        this.bookmarkData.find(function (item) {
            if (item.url == _title) {
                result.push(item);
            }
        });
        console.log(item);
        return item;
    },
    FindItemById: function (_id) {
        var result = null;
        this.bookmarkData.find(function (item) {
            if (item.id == _id) {
                result = item;
            }
        });
        return result;
    },

    SortByUrl: function () {
        this.SortByUrlAsc();
    },

    SortByUrlAsc: function () {
        this.bookmarkData.sort(function (a, b) {
            var urlA = a.url;
            var urlB = b.url;

            if (urlA == undefined) {
                return 1;
            }
            if (urlB == undefined) {
                return -1;
            }

            if (urlA > urlB) {
                return 1;
            }
            if (urlA < urlB) {
                return -1;
            }
            return 0;
        });
    },
    SortByUrlDesc: function () {
        this.bookmarkData.sort(function (a, b) {
            var urlA = a.url;
            var urlB = b.url;
            if (urlA == undefined) {
                return -1;
            }
            if (urlB == undefined) {
                return 1;
            }

            if (urlA > urlB) {
                return -1;
            }
            if (urlA < urlB) {
                return 1;
            }
            return 0;
        });
    },
    SortByAddTimeAsc: function () {
        this.bookmarkData.sort(function (a, b) {
            var dateA = a.dateAdded;
            var dateB = b.dateAdded;
            if (dateA > dateB) {
                return 1;
            }
            if (dateA < dateB) {
                return -1;
            }
            return 0;
        });
    },
    SortByAddTimeDesc: function () {
        this.bookmarkData.sort(function (a, b) {
            var dateA = a.dateAdded;
            var dateB = b.dateAdded;
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        });
    },

    SortByAddTime: function () {
        this.SortByAddTimeAsc();
    },

    bookmarkData: new Array,
    repeatItems: new Array,

    bookmarkCount: function () {
        //return bookmark Count
        return this.bookmarkData.length;
    },
    Id: 1,
    dateAdded: 1231123123,
    url: "http://baidu.com",
    title: "baidu",
    parentId: -1,
    userId: '1',
    username: 'test',
    password: 'test',
    SyncToServer: function () { },
    //sync data from server
    SyncFromServer: function () { },
}

// Search the bookmarks when entering the search keyword.
$(function () {
    $('#search').change(function () {
        $('#bookmarks').empty();
        dumpBookmarks($('#search').val());
    });
    $("#GetRepetItem").click(function () {

        GetRepeatItems();
    });
});
function GetRepeatItems() {
    BookmarkManager.GetRepeatItems();

    var list = $('<ul>');
    for (var i = 0; i < BookmarkManager.repeatItems.length; ++i) {
        var li = $('<li>');
        li.val(i);
        li.append("<b>" + BookmarkManager.repeatItems[i].title + "</b><span>" + BookmarkManager.repeatItems[i].url + "</span>");
        var options = $('<span>[<a id="editlink" href="#">Edit</a> <a id="deletelink" ' +
'href="#">Delete</a>]</span>');
        var edit = $('<input>');
        li.hover(function () {
            //li.append(options);
            $(this).append(options);
            options.val($(this).val());
            $('#deletelink').click(function () {
                var index = $(this).parent().val();

                $('#deletedialog').empty().dialog({
                    closeOnEscape: true,
                    autoOpen: false,
                    title: 'Confirm Deletion',
                    resizable: false,
                    height: 140,
                    modal: true,
                    show: 'slide',
                    overlay: {
                        backgroundColor: '#000',
                        opacity: 0.5
                    },
                    buttons: {
                        'Yes, Delete It!': function () {

                            chrome.bookmarks.remove(String(BookmarkManager.repeatItems[index].id));
                            BookmarkManager.DeleteItemByItemId(BookmarkManager.repeatItems[index].id);
                            $(this).dialog('destroy');
                            GetRepeatItems();
                        },
                        Cancel: function () {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            $('#editlink').click(function () {
                var index = $(this).parent().val();
                edit.val(BookmarkManager.repeatItems[index].title);
                $('#editdialog').empty().append(edit).dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    title: 'Edit Bookmark',
                    modal: true,
                    show: 'slide',
                    buttons: {
                        'Save': function () {
                            chrome.bookmarks.update(String(BookmarkManager.repeatItems[index].id), {
                                title: edit.val()
                            });
                            var item = BookmarkManager.FindItemById(BookmarkManager.repeatItems[index].id);
                            if (item) {
                                item.title = edit.val();
                            }
                            //options.show();
                            edit.remove();
                            $(this).dialog('destroy');
                            GetRepeatItems();
                        },
                        'Cancel': function () {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            options.fadeIn();
        }, function () {
            options.remove();
        });
        list.append(li);
    }
    $('#bookmarks').empty().append(list);
}
// Traverse the bookmark tree, and print the folder and nodes.

function dumpBookmarks(query) {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function (bookmarkTreeNodes) {
            $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
        });
}

function dumpTreeNodes(bookmarkNodes, query) {
    var list = $('<ul>');
    var i;
    for (i = 0; i < bookmarkNodes.length; i++) {
        list.append(dumpNode(bookmarkNodes[i], query));
    }
    return list;
}

function dumpNode(bookmarkNode, query) {
    //Add BookmarkNode to BookmarkManager
    //BookmarkManager.AddItemByBookmarkNode(bookmarkNode);

    if (bookmarkNode.title) {
        if (query && !bookmarkNode.children) {
            if (String(bookmarkNode.title).indexOf(query) == -1) {
                return $('<span></span>');
            }
        }
        var anchor = $('<a>');
        anchor.attr('href', bookmarkNode.url);
        anchor.text(bookmarkNode.title);
        if (bookmarkNode.url) {
            anchor.attr("class", "bookmark_link");
        }
        else {
            anchor.attr("class", "bookmark_dir");

        }
        /*
         * When clicking on a bookmark in the extension, a new tab is fired with
         * the bookmark url.
         */
        anchor.click(function () {
            chrome.tabs.create({
                url: bookmarkNode.url
            });
        });
        var span = $('<span>');
        var options = bookmarkNode.children ?
            $('<span>[<a href="#" id="addlink">Add</a>]</span>') :
            $('<span>[<a id="editlink" href="#">Edit</a> <a id="deletelink" ' +
                'href="#">Delete</a>]</span>');
        var edit = bookmarkNode.children ? $('<table><tr><td>Name</td><td>' +
            '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
            '</td></tr></table>') : $('<input>');
        // Show add and edit links when hover over.
        span.hover(function () {
            span.append(options);
            $('#deletelink').click(function () {
                $('#deletedialog').empty().dialog({
                    closeOnEscape: true,
                    autoOpen: false,
                    title: 'Confirm Deletion',
                    resizable: false,
                    height: 140,
                    modal: true,
                    show: 'slide',
                    overlay: {
                        backgroundColor: '#000',
                        opacity: 0.5
                    },
                    buttons: {
                        'Yes, Delete It!': function () {
                            chrome.bookmarks.remove(String(bookmarkNode.id));
                            span.parent().remove();
                            $(this).dialog('destroy');
                        },
                        Cancel: function () {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            $('#addlink').click(function () {
                $('#adddialog').empty().append(edit).dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    title: 'Add New Bookmark',
                    modal: true,
                    buttons: {
                        'Add': function () {
                            chrome.bookmarks.create({
                                parentId: bookmarkNode.id,
                                title: $('#title').val(),
                                url: $('#url').val()
                            });
                            $('#bookmarks').empty();
                            $(this).dialog('destroy');
                            window.dumpBookmarks();
                        },
                        'Cancel': function () {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            $('#editlink').click(function () {
                edit.val(anchor.text());
                $('#editdialog').empty().append(edit).dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    title: 'Edit Bookmark',
                    modal: true,
                    show: 'slide',
                    buttons: {
                        'Save': function () {
                            chrome.bookmarks.update(String(bookmarkNode.id), {
                                title: edit.val()
                            });
                            anchor.text(edit.val());
                            options.show();
                            $(this).dialog('destroy');
                        },
                        'Cancel': function () {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            options.fadeIn();
        },
            // unhover

            function () {
                options.remove();
            }).append(anchor);
    }
    var li = $(bookmarkNode.title ? '<li>' : '<div>').append(span);
    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
        li.append(dumpTreeNodes(bookmarkNode.children, query));
    }
    return li;
}

//document.addEventListener('DOMContentLoaded', function () {
//    dumpBookmarks();
//});
var myBookmark = {
    getBookmarks: function () {
        var info = document.createElement("b");
        info.innerHTML = "bbbbb";
        document.body.appendChild(info);
    }
}
var test = {
    test: function () {
        alert("test");
    }
}

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    //myBookmark.getBookmarks();
    //test.test();
    dumpBookmarks();
    BookmarkManager.Init();
});
