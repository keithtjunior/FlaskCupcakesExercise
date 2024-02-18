$(document).ready(function() {
    const cupcakeForm = $('#cupcake-form');
    const cupcakeList = $('#cupcake-list');
    const inputFlavor = $('#input-flavor');
    const inputSize = $('#input-size');
    const inputRating = $('#input-rating');
    const inputImage = $('#input-image');

    $(document).on('click', '#delete-cupcake', deleteCupcake);

    cupcakeForm.submit(function(e){
        e.preventDefault();
        addCupcake();
     });

    async function getCupcakes() {
        try {
            let res =  await axios.get(`http://127.0.0.1:5000/api/cupcakes`);
            const data = res.data.cupcakes;
            if (data){
                cupcakeList.empty();
                loadCupcakeList(data);
            } 
        } catch (err) {
            console.log(err);
            return;
        }
    }

    async function addCupcake() {
        let flavor = inputFlavor.val().trim();
        let size = inputSize.val().trim();
        let rating = inputRating.val().trim();
        let image = inputImage.val().trim();
        const data = {flavor, size, rating, image};
        axios.post('http://127.0.0.1:5000/api/cupcakes', data)
        .then(function() { 
            getCupcakes();
        })
        .catch(function(err) { 
            console.log(err); 
            return;
        });
    }

    async function deleteCupcake() {
        let id = $(this).data('id');
        try {
            let res =  await axios.delete(`http://127.0.0.1:5000/api/cupcakes/${id}`);
            if (res) $(this).parent().remove();
        } catch (err) {
            console.log(err);
            return;
        }
    }
    
    function loadCupcakeList(cupcakes){
        for(let c of cupcakes){
            let li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
            li.innerHTML = `<div class="ms-2 me-auto"><div class="fw-bold capitalize">${c.flavor}</div>Rating: ${c.rating}</div><button class="badge bg-danger rounded-pill" id="delete-cupcake" data-id=${c.id}>X</button>`
            cupcakeList.append(li);
        }
    }

    getCupcakes();

});



