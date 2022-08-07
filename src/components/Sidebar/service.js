export function setActiveSidebarItem(id) {
    var items = document.getElementsByClassName('sidebar-item');
    var i;
    
    for (i = 0; i < items.length; i++) {
        items[i].classList.remove('active');

        if (items[i].id === id) {
            items[i].classList.add('active');
        }
    }
}