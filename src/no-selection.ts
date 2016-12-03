import { Compiler } from './test';


export class NoSelection {
    message = "Please Select a Contact.";
    data;
    col1width=100;
    col2width=1000;
    col3width=100;
    col4width=100;
    col5width=100;

    activate() {
        this.data = [];
        for (let i = 0; i < 100; i++) {
            this.data.push({ 
                field1: Math.floor(Math.random() * 24), 
                field2: Math.floor(Math.random() * 24), 
                field3: Math.floor(Math.random() * 24), 
                field4: Math.floor(Math.random() * 24), 
                field5: Math.floor(Math.random() * 24) 
            });
        }
        this.data[3].field3="this is long text to show how the grid would react to long stuff in its content."
        return true;
    }


}

    // drop(item, target, source, sibling, itemVM, siblingVM) {
    //     let itemId = item.dataset.id;
    //     //let siblingId = sibling ? sibling.dataset.id : null;

    //     //     alert("hello " + siblingId);
    // }

    // // this is the recommended event handler from the interact homepage, updated
    // // as event.detail is the interact event
    // moveElement(customEvent) {

    //     let event = customEvent.detail;
    //     let target = event.target,

    //         // keep the dragged position in the data-x/data-y attributes
    //         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    //         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    //     // translate the element
    //     target.style.webkitTransform =
    //         target.style.transform =
    //         'translate(' + x + 'px, ' + y + 'px)';

    //     // update the posiion attributes
    //     target.setAttribute('data-x', x);
    //     target.setAttribute('data-y', y);
    // }

    // test(ev)    {
    //     console.log(ev);
    // }

    // enter(ev)   {
    //     console.log('enter');
    // }
// }