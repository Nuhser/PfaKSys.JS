export function setActiveSidebarItem(id) {
    var dropdownContainer = document.getElementsByClassName('dropdown-container');
    for (var i = 0; i < dropdownContainer.length; i++) {
        dropdownContainer[i].style.display = 'none';
    }


    var items = document.getElementsByClassName('sidebar-item');    
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');

        if (items[i].id === id) {
            items[i].classList.add('active');

            var parent = items[i].parentElement;
            if (parent && parent.classList.contains('dropdown-container')) {
                parent.style.display = 'block';
            }
        }
    }
}