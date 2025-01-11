
    function calcularTotal() {
        let quantidade = parseFloat(document.getElementById('quantidade').value);
        let preco = parseFloat(document.getElementById('preco').value);
        let total = quantidade * preco;
        document.getElementById('valorTotal').textContent = "Total: R$ " + total.toFixed(2);
    }

    document.getElementById('quantidade').addEventListener('input', calcularTotal);
    document.getElementById('preco').addEventListener('input', calcularTotal);

    document.getElementById('formCompra').addEventListener('submit', function (event) {
        let tabela;
        event.preventDefault();
        let nomeProduto = document.getElementById('nome-do-produto').value;
        let quantidade = parseFloat(document.getElementById('quantidade').value);
        let preco = parseFloat(document.getElementById('preco').value);
        let total = quantidade * preco;

        let produtoID = document.getElementById('produtoID').value;

        if (produtoID) {
            tabela = document.getElementById('tabelaProdutos');
            let linha = tabela.rows[produtoID];
            linha.cells[0].textContent = nomeProduto;
            linha.cells[1].textContent = quantidade;
            linha.cells[2].textContent = preco.toFixed(2);
            linha.cells[3].textContent = total.toFixed(2);
            document.getElementById('produtoID').value = '';
        } else {
            tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
            let novaLinha = tabela.insertRow(tabela.rows.length);
            let celulaNome = novaLinha.insertCell(0);
            let celulaQuantidade = novaLinha.insertCell(1);
            let celulaPreco = novaLinha.insertCell(2);
            let celulaTotal = novaLinha.insertCell(3);
            let celulaAcoes = novaLinha.insertCell(4);

            celulaNome.textContent = nomeProduto;
            celulaQuantidade.textContent = quantidade;
            celulaPreco.textContent = preco.toFixed(2);
            celulaTotal.textContent = total.toFixed(2);

            let btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', function () {
                document.getElementById('nome-do-produto').value = nomeProduto;
                document.getElementById('quantidade').value = quantidade;
                document.getElementById('preco').value = preco;
                document.getElementById('produtoID').value = novaLinha.rowIndex;
                calcularTotal();
            });

            let btnDeletar = document.createElement('button');
            btnDeletar.textContent = 'Deletar';
            btnDeletar.addEventListener('click', function () {
                let linhaDeletar = this.parentNode.parentNode;
                linhaDeletar.parentNode.removeChild(linhaDeletar);
                calcularTotalProdutos();
            });

            celulaAcoes.appendChild(btnEditar);
            celulaAcoes.appendChild(btnDeletar);
        }

        calcularTotalProdutos();

        document.getElementById('nome-do-produto').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('preco').value = '';
        calcularTotal();
    });

    document.getElementById('limparTabela').addEventListener('click', function () {
        let tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
        tabela.innerHTML = '';
        document.getElementById('totalProdutos').textContent = "Total da Compra: R$ 0.00";
    });

    function calcularTotalProdutos() {
        let tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
        let totalProdutos = 0;
        for (let i = 0; i < tabela.rows.length; i++) {
            totalProdutos += parseFloat(tabela.rows[i].cells[3].textContent);
        }
        document.getElementById('totalProdutos').textContent = "Total da Compra: R$ " + totalProdutos.toFixed(2);
    }
       
