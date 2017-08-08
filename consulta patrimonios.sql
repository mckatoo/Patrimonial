SELECT tipo.nome as tipo,
ctrlpatrimonio.numPlacaPatr,
ctrlpatrimonio.descr,
setor.nome as setor,
areainst.nome as areainst,
ctrlpatrimonio.numNotaFiscal,
fornecedor.nome as fornecedor,
ctrlpatrimonio.dataAquisicao,
ctrlpatrimonio.ativo,
login.nome as autor
FROM 
`iesi-patrimonio`.ctrlpatrimonio,
`iesi-patrimonio`.tipo,
`iesi-patrimonio`.setor,
`iesi-patrimonio`.areainst,
`iesi-patrimonio`.fornecedor,
`iesi-patrimonio`.login
where tipo.cod = ctrlpatrimonio.tipoMov 
and setor.cod = ctrlpatrimonio.setor 
and areainst.cod = ctrlpatrimonio.areaInstituto 
and fornecedor.cod = ctrlpatrimonio.fornecedor 
and login.idUsers = ctrlpatrimonio.autor;