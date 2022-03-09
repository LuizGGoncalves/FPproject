
if (document.querySelector('#NewTreinoModal')) {
    const modal = document.querySelector('#NewTreinoModal');
    modal.addEventListener('show.bs.modal', (event) => {
        const form = document.querySelector('#newMessageForm');
        let bnt = event.relatedTarget
        let valor = bnt.getAttribute('valor')
        form.setAttribute('action', `/treino/create/${valor}`)
    })
}
