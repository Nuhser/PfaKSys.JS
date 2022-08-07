export function setActiveSidebarItem(id) {
    var dropdownContainers = document.getElementsByClassName('sidebar-dropdown-container');
    for (let i = 0; i < dropdownContainers.length; i++) {
        dropdownContainers[i].style.display = 'none';
        dropdownContainers[i].previousSibling.classList.remove('open');
    }


    var items = document.getElementsByClassName('sidebar-item');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active');

        if (items[i].id === id) {
            items[i].classList.add('active');

            var parent = items[i].parentElement;
            if (parent && parent.classList.contains('sidebar-dropdown-container')) {
                parent.style.display = 'block';
                parent.previousSibling.classList.add('open');
            }
        }
    }
}