import { IProduct } from "../IProduct";

const baseProducts: IProduct[] = [
  // Hortifruti (Frutas)
  { uuid: "dbc8ec81-ab38-4788-a018-a5d3b522d108", name: "Banana", amount: [], unit: "Un", tag: "fd4737cb-212c-42b2-9179-85319ee229d7" },
  { uuid: "c9cd8325-8c7f-42c2-9973-5ca9307a75ad", name: "Maçã", amount: [], unit: "Un", tag: "fd4737cb-212c-42b2-9179-85319ee229d7" },
  { uuid: "ad054c6f-a635-4029-8dde-1fa439ae293d", name: "Laranja", amount: [], unit: "Un", tag: "fd4737cb-212c-42b2-9179-85319ee229d7" },
  { uuid: "469a76e0-42be-445a-915f-e65d033f66fd", name: "Uva", amount: [], unit: "Un", tag: "fd4737cb-212c-42b2-9179-85319ee229d7" },
  { uuid: "76076b0d-8008-4006-91da-f6dae4ecf440", name: "Mamão", amount: [], unit: "Un", tag: "fd4737cb-212c-42b2-9179-85319ee229d7" },
  // Hortifruti (Verduras)
  { uuid: "9d48609b-70e3-45aa-a9f7-91ca99285947", name: "Alface", amount: [], unit: "Un", tag: "b1cde2c0-169c-4aa4-8b73-f29b13a8f43e" },
  { uuid: "5e6a62e3-2bee-4ada-87f5-57166798195d", name: "Couve", amount: [], unit: "Un", tag: "b1cde2c0-169c-4aa4-8b73-f29b13a8f43e" },
  { uuid: "cad7f3c6-80ec-49d6-ac1d-ffedf8193dec", name: "Rúcula", amount: [], unit: "Un", tag: "b1cde2c0-169c-4aa4-8b73-f29b13a8f43e" },
  { uuid: "91401021-624b-4152-a049-940574b5f272", name: "Espinafre", amount: [], unit: "Un", tag: "b1cde2c0-169c-4aa4-8b73-f29b13a8f43e" },
  // Hortifruti (Legumes)
  { uuid: "d058940c-57be-48fb-878f-1bf790f3ffb2", name: "Tomate", amount: [], unit: "Un", tag: "0c26d9fa-4e39-440f-883d-630d148909b3" },
  { uuid: "7ea2b253-f4a9-4d9f-970d-9e09b5e3f329", name: "Cebola", amount: [], unit: "Un", tag: "0c26d9fa-4e39-440f-883d-630d148909b3" },
  { uuid: "34e9414e-9ce2-4ef8-b3dc-ca0a606b29b6", name: "Batata", amount: [], unit: "Un", tag: "0c26d9fa-4e39-440f-883d-630d148909b3" },
  { uuid: "6a84dccb-e102-4eea-8f0e-893da7856418", name: "Cenoura", amount: [], unit: "Un", tag: "0c26d9fa-4e39-440f-883d-630d148909b3" },
  { uuid: "e8241e51-7434-49d2-89c5-dbfb1ef841a1", name: "Pimentão", amount: [], unit: "Un", tag: "0c26d9fa-4e39-440f-883d-630d148909b3" },
  // Ovos
  { uuid: "e8fb1ba6-7cd1-45bd-bf80-3894787d567f", name: "Ovo Branco", amount: [], unit: "Un", tag: "4e57daa4-d511-445d-af87-1574ea193a7a" },
  { uuid: "162c1891-f4e5-4890-9eec-4e35f33347d3", name: "Ovo Caipira", amount: [], unit: "Un", tag: "4e57daa4-d511-445d-af87-1574ea193a7a" },
  // Açougue
  { uuid: "8aa55f43-1882-4a32-bc31-4365686757d3", name: "Alcatra", amount: [], unit: "Un", tag: "a6b87490-bb3d-4edf-a4b0-054cc0aa31a2" },
  { uuid: "d0c9efa0-1cdb-4708-b1d4-5bb01266aa8f", name: "Picanha", amount: [], unit: "Un", tag: "a6b87490-bb3d-4edf-a4b0-054cc0aa31a2" },
  { uuid: "316d8993-0af0-4d67-88db-ef7be19c4e05", name: "Frango Inteiro", amount: [], unit: "Un", tag: "a6b87490-bb3d-4edf-a4b0-054cc0aa31a2" },
  { uuid: "29014f80-4b27-4338-878f-33e3258e4c9b", name: "Costela Suína", amount: [], unit: "Un", tag: "a6b87490-bb3d-4edf-a4b0-054cc0aa31a2" },
  { uuid: "76dbf6a7-ce0b-4987-8cc9-498749c02494", name: "Linguiça", amount: [], unit: "Un", tag: "a6b87490-bb3d-4edf-a4b0-054cc0aa31a2" },
  // Peixaria
  { uuid: "4c158c16-c01f-4a62-a926-3d04c1cae198", name: "Filé de Tilápia", amount: [], unit: "Un", tag: "f4e0184d-31a2-41e0-8797-9d4cd13a7ba4" },
  { uuid: "6de5560b-94af-4e37-b538-a4941b9ad0ac", name: "Salmão", amount: [], unit: "Un", tag: "f4e0184d-31a2-41e0-8797-9d4cd13a7ba4" },
  { uuid: "1b2eccd5-6e29-4d22-8588-687d4a633a65", name: "Camarão", amount: [], unit: "Un", tag: "f4e0184d-31a2-41e0-8797-9d4cd13a7ba4" },
  // Frios e Embutidos
  { uuid: "97d3a8b0-ed1d-402a-9562-b576d4ec3473", name: "Presunto", amount: [], unit: "Un", tag: "c2cc6eb8-4078-4452-bdc9-34a445c8d7e4" },
  { uuid: "d816f335-f971-4797-ba30-c9aa87f9b4fd", name: "Peito de Peru", amount: [], unit: "Un", tag: "c2cc6eb8-4078-4452-bdc9-34a445c8d7e4" },
  { uuid: "8cfc97ef-2482-41ee-8b13-f0bfd5a1922a", name: "Salame", amount: [], unit: "Un", tag: "c2cc6eb8-4078-4452-bdc9-34a445c8d7e4" },
  { uuid: "4d6dcdf0-8bd3-4664-bcd0-8f93bff7bf5d", name: "Mortadela", amount: [], unit: "Un", tag: "c2cc6eb8-4078-4452-bdc9-34a445c8d7e4" },
  // Laticínios
  { uuid: "5c2b248c-0dde-4578-b84c-e32dff2e5524", name: "Leite Integral", amount: [], unit: "Un", tag: "1ccf5184-1699-4eb7-a045-1f0e8d180668" },
  { uuid: "2f00f4db-0ba6-4bb0-be63-417467f15198", name: "Creme de Leite", amount: [], unit: "Un", tag: "1ccf5184-1699-4eb7-a045-1f0e8d180668" },
  { uuid: "c6a4281b-276c-4421-9a57-595d0fd8fda5", name: "Leite Condensado", amount: [], unit: "Un", tag: "1ccf5184-1699-4eb7-a045-1f0e8d180668" },
  // Queijos
  { uuid: "52936fb1-9761-4521-9825-e16f5d78ebb2", name: "Queijo Mussarela", amount: [], unit: "Un", tag: "15ebdab6-07f5-46d2-b8d9-8ace1da1147e" },
  { uuid: "d090c4a4-c4db-4d44-9d99-2df3abfbfa58", name: "Queijo Prato", amount: [], unit: "Un", tag: "15ebdab6-07f5-46d2-b8d9-8ace1da1147e" },
  { uuid: "67414fba-c55a-443a-bbe1-faac3fc08062", name: "Queijo Parmesão", amount: [], unit: "Un", tag: "15ebdab6-07f5-46d2-b8d9-8ace1da1147e" },
  // Iogurtes
  { uuid: "42cbc9a7-302c-476a-a9ca-c7883d1802c9", name: "Iogurte Natural", amount: [], unit: "Un", tag: "6ff48e61-60cc-4903-8242-8e5d563fee19" },
  { uuid: "829e97d3-3e89-42bb-b1c5-aff8168fa4fc", name: "Iogurte de Morango", amount: [], unit: "Un", tag: "6ff48e61-60cc-4903-8242-8e5d563fee19" },
  { uuid: "9a39de5b-9a51-4fdd-8ae0-d8529c5cbc59", name: "Iogurte Grego", amount: [], unit: "Un", tag: "6ff48e61-60cc-4903-8242-8e5d563fee19" },
  // Manteiga e Margarina
  { uuid: "e0e01e31-4fbc-4f87-8cc5-980983f84a53", name: "Manteiga", amount: [], unit: "Un", tag: "c954cd8c-fa6f-4f05-b79e-fbd79df01ebb" },
  { uuid: "b56bc99b-1fab-4ec7-a8bd-980841540dc5", name: "Margarina", amount: [], unit: "Un", tag: "c954cd8c-fa6f-4f05-b79e-fbd79df01ebb" },
  // Padaria
  { uuid: "4e81bdb8-908a-4f0c-9d57-d914c591b387", name: "Pão Francês", amount: [], unit: "Un", tag: "1d55aea1-4345-49be-89d8-80a95eb2fc10" },
  { uuid: "651f4b46-fd2f-4a2e-b5ed-391272519931", name: "Pão de Forma", amount: [], unit: "Un", tag: "1d55aea1-4345-49be-89d8-80a95eb2fc10" },
  { uuid: "594f3aa9-10ab-4e39-8239-9c70b17a9087", name: "Pão Integral", amount: [], unit: "Un", tag: "1d55aea1-4345-49be-89d8-80a95eb2fc10" },
  // Confeitaria
  { uuid: "fe1e897f-be32-4aaf-aeec-a19076093bed", name: "Bolo de Chocolate", amount: [], unit: "Un", tag: "5850dbcc-ade7-45e0-a2ef-1628cee53e23" },
  { uuid: "856b2c7a-a113-4e65-b9ad-6de6fa7642b3", name: "Torta de Limão", amount: [], unit: "Un", tag: "5850dbcc-ade7-45e0-a2ef-1628cee53e23" },
  // Congelados
  { uuid: "2283b1e7-453a-48cb-8495-5ac53a344357", name: "Lasanha Congelada", amount: [], unit: "Un", tag: "6535389a-76b2-4bfb-98e6-7dfa8acdf23f" },
  { uuid: "fd6278f6-1808-4c84-ba4f-5b6d7a56b824", name: "Pizza Congelada", amount: [], unit: "Un", tag: "6535389a-76b2-4bfb-98e6-7dfa8acdf23f" },
  { uuid: "2c6e724a-a7a5-49c6-b165-342f14ac064c", name: "Batata Frita Congelada", amount: [], unit: "Un", tag: "6535389a-76b2-4bfb-98e6-7dfa8acdf23f" },
  // Sorvetes
  { uuid: "3e2bb63e-7395-4107-b0d6-60c6f16a3e7f", name: "Sorvete de Chocolate", amount: [], unit: "Un", tag: "c9c3e4f4-800d-49b4-8e53-740ff911b875" },
  { uuid: "8602b75a-c2fa-429b-b006-723c08eb3170", name: "Sorvete de Creme", amount: [], unit: "Un", tag: "c9c3e4f4-800d-49b4-8e53-740ff911b875" },
  { uuid: "e42e5d6b-957d-4cfd-96e7-4fd91a6b8744", name: "Picolé", amount: [], unit: "Un", tag: "c9c3e4f4-800d-49b4-8e53-740ff911b875" },
  // Massas
  { uuid: "2e4bc937-d5ed-4f50-9f31-277b48183028", name: "Macarrão Espaguete", amount: [], unit: "Un", tag: "5c5465dd-fbd2-4c42-88c8-b026aa7dcd5e" },
  { uuid: "0d30e50d-05de-4705-b867-0b729078bf2b", name: "Macarrão Parafuso", amount: [], unit: "Un", tag: "5c5465dd-fbd2-4c42-88c8-b026aa7dcd5e" },
  { uuid: "7391b20b-cf2c-45da-b290-5ec448b014fc", name: "Lasanha (massa)", amount: [], unit: "Un", tag: "5c5465dd-fbd2-4c42-88c8-b026aa7dcd5e" },
  // Arroz e Feijão
  { uuid: "5099cfa4-971e-4353-8fea-db79cb133275", name: "Arroz Branco", amount: [], unit: "Un", tag: "0888ede8-66a1-41a3-b268-bb0d9fa924f8" },
  { uuid: "2e0c9eac-7009-4539-ae9f-99e1b5912a36", name: "Feijão Carioca", amount: [], unit: "Un", tag: "0888ede8-66a1-41a3-b268-bb0d9fa924f8" },
  { uuid: "feb127c6-21e8-4b78-b775-879041741880", name: "Feijão Preto", amount: [], unit: "Un", tag: "0888ede8-66a1-41a3-b268-bb0d9fa924f8" },
  // Grãos e Cereais
  { uuid: "7c18296f-b980-4428-9bbb-a9ed6ec4984c", name: "Lentilha", amount: [], unit: "Un", tag: "c203cd29-5288-4ebd-ba5e-fd129eac62e4" },
  { uuid: "ae628ca7-aa9e-4609-abe0-9b98030ec48a", name: "Grão de Bico", amount: [], unit: "Un", tag: "c203cd29-5288-4ebd-ba5e-fd129eac62e4" },
  { uuid: "8f567dc9-1fa4-422e-9836-8e5a32d7530e", name: "Milho", amount: [], unit: "Un", tag: "c203cd29-5288-4ebd-ba5e-fd129eac62e4" },
  // Farináceos
  { uuid: "d0a3c34f-7bcc-46ca-9555-38456b154536", name: "Farinha de Trigo", amount: [], unit: "Un", tag: "de5fd946-55d0-40b5-b836-9333b564facf" },
  { uuid: "17f270ee-c88a-4e37-940a-8fd278f760da", name: "Farinha de Mandioca", amount: [], unit: "Un", tag: "de5fd946-55d0-40b5-b836-9333b564facf" },
  { uuid: "c5f0aa2a-b8be-4d5f-86b9-8448814f7307", name: "Fubá", amount: [], unit: "Un", tag: "de5fd946-55d0-40b5-b836-9333b564facf" },
  // Óleos e Azeites
  { uuid: "88542905-db7e-4858-91aa-66bf5dca28cf", name: "Óleo de Soja", amount: [], unit: "Un", tag: "0feb21cb-2960-4aff-9e99-0e9547cbc745" },
  { uuid: "35d35385-9a1e-4a03-897e-bbda181dfa7e", name: "Azeite de Oliva Extra Virgem", amount: [], unit: "Un", tag: "0feb21cb-2960-4aff-9e99-0e9547cbc745" },
  // Molhos e Temperos
  { uuid: "cf740918-bea9-4191-b543-a629d24e1218", name: "Molho de Tomate", amount: [], unit: "Un", tag: "8699278e-6b17-43da-b688-3b3562d15df7" },
  { uuid: "a1a60bc1-cfdd-4ac1-b18b-91b4421add2c", name: "Maionese", amount: [], unit: "Un", tag: "8699278e-6b17-43da-b688-3b3562d15df7" },
  { uuid: "85548aba-f809-4a74-ad8b-b2a722842a0f", name: "Ketchup", amount: [], unit: "Un", tag: "8699278e-6b17-43da-b688-3b3562d15df7" },
  { uuid: "8f67c20d-93e5-4b3d-a8a0-0628d0dbc38c", name: "Mostarda", amount: [], unit: "Un", tag: "8699278e-6b17-43da-b688-3b3562d15df7" },
  // Enlatados e Conservas
  { uuid: "028808b3-efd8-4be5-b14c-82f0cda66407", name: "Milho em Conserva", amount: [], unit: "Un", tag: "fe35983e-d971-4fc3-990b-2ce706e28428" },
  { uuid: "032636ae-4fbf-4b37-abfb-55e67344256e", name: "Ervilha em Conserva", amount: [], unit: "Un", tag: "fe35983e-d971-4fc3-990b-2ce706e28428" },
  { uuid: "030c1d46-a998-4bd2-ac47-d86a14b71b7d", name: "Atum em Lata", amount: [], unit: "Un", tag: "fe35983e-d971-4fc3-990b-2ce706e28428" },
  // Sopas e Cremes
  { uuid: "8a0a1761-0cd4-4cec-807e-8c709916285f", name: "Sopa de Legumes (pronta)", amount: [], unit: "Un", tag: "31f00cd5-6423-4447-a8ba-6f0bffa556f3" },
  { uuid: "51ba2540-ccaf-4bcf-b1d7-2d7ae34bcda7", name: "Creme de Cebola (pó)", amount: [], unit: "Un", tag: "31f00cd5-6423-4447-a8ba-6f0bffa556f3" },
  // Café e Chá
  { uuid: "9ca6c8ed-3275-46fa-be2a-f24fbe1558c5", name: "Café Torrado e Moído", amount: [], unit: "Un", tag: "a8ecbe0e-8ad0-41e4-9b99-f6daf743bd48" },
  { uuid: "3a3b537d-df0d-44df-8ac0-818dd1dabd7d", name: "Chá Mate", amount: [], unit: "Un", tag: "a8ecbe0e-8ad0-41e4-9b99-f6daf743bd48" },
  { uuid: "39533e35-ff45-4574-933c-fd1e1722568b", name: "Chá de Camomila", amount: [], unit: "Un", tag: "a8ecbe0e-8ad0-41e4-9b99-f6daf743bd48" },
  // Achocolatados
  { uuid: "4838403f-a6eb-4fb8-a16d-6846c57ed70b", name: "Achocolatado em Pó", amount: [], unit: "Un", tag: "2932ace5-453f-4532-8bd7-9200afa283e0" },
  { uuid: "48a5215a-10da-414b-b5dc-6ea298783e93", name: "Achocolatado Líquido", amount: [], unit: "Un", tag: "2932ace5-453f-4532-8bd7-9200afa283e0" },
  // Biscoitos e Bolachas
  { uuid: "4b78507d-6108-48b3-8572-61fbb6ed41e9", name: "Biscoito Recheado", amount: [], unit: "Un", tag: "46bb1bb8-1189-446d-8341-33c02119bac5" },
  { uuid: "ccbd35be-05aa-4359-9bec-5b4844c5b227", name: "Bolacha Água e Sal", amount: [], unit: "Un", tag: "46bb1bb8-1189-446d-8341-33c02119bac5" },
  { uuid: "d074e4c9-784f-4e8e-9c9a-f336ef13b31b", name: "Biscoito Maisena", amount: [], unit: "Un", tag: "46bb1bb8-1189-446d-8341-33c02119bac5" },
  // Doces e Sobremesas
  { uuid: "deb7d548-17b4-4711-90d6-bf818890cb0f", name: "Doce de Leite", amount: [], unit: "Un", tag: "8d5aa568-c7ec-412d-91ab-7c86f74dc78a" },
  { uuid: "496c4d7f-9d11-43c6-838e-2a8d006a3187", name: "Pudim (pó para preparo)", amount: [], unit: "Un", tag: "8d5aa568-c7ec-412d-91ab-7c86f74dc78a" },
  // Chocolates
  { uuid: "985c69bf-b983-4bef-9737-29e964a0b8da", name: "Chocolate ao Leite", amount: [], unit: "Un", tag: "417fdaa8-64fe-46cd-b41f-9658efba551b" },
  { uuid: "9c4a9ecb-3d1f-4e86-92f2-afc5b20e004e", name: "Chocolate Amargo", amount: [], unit: "Un", tag: "417fdaa8-64fe-46cd-b41f-9658efba551b" },
  { uuid: "78527352-74a3-4755-b6f5-39290466fd95", name: "Bombom", amount: [], unit: "Un", tag: "417fdaa8-64fe-46cd-b41f-9658efba551b" },
  // Balas e Guloseimas
  { uuid: "c83d13fc-256d-4e5f-874d-53c33c3443b1", name: "Bala de Goma", amount: [], unit: "Un", tag: "ec7e2516-d4e4-4eeb-9dc8-9dfabae543be" },
  { uuid: "51d98eaf-76ac-4b6e-8eb7-7ce41ce030e9", name: "Pirulito", amount: [], unit: "Un", tag: "ec7e2516-d4e4-4eeb-9dc8-9dfabae543be" },
  { uuid: "a5d518fe-d3b5-4250-b482-3bad86a35cbb", name: "Chiclete", amount: [], unit: "Un", tag: "ec7e2516-d4e4-4eeb-9dc8-9dfabae543be" },
  // Snacks e Salgadinhos
  { uuid: "b7349347-c741-4fe1-ad1c-4b19b2f366d5", name: "Batata Frita (pacote)", amount: [], unit: "Un", tag: "54980d26-f802-40ec-a25f-eac767502f4c" },
  { uuid: "11d2428e-6b6a-4d8f-9bee-a2ebbabaf4dc", name: "Salgadinho de Milho", amount: [], unit: "Un", tag: "54980d26-f802-40ec-a25f-eac767502f4c" },
  { uuid: "e6e7713d-a46f-483e-967c-c7d9017d6a2b", name: "Pipoca de Micro-ondas", amount: [], unit: "Un", tag: "54980d26-f802-40ec-a25f-eac767502f4c" },
  // Cereais Matinais
  { uuid: "74853c27-2da5-4817-a268-7e85167b5e00", name: "Sucrilhos", amount: [], unit: "Un", tag: "2714c5fe-9df7-4c1a-a486-00b9eb0eb030" },
  { uuid: "a939959d-f544-46ad-a7e0-e1b7a54153c8", name: "Granola", amount: [], unit: "Un", tag: "2714c5fe-9df7-4c1a-a486-00b9eb0eb030" },
  { uuid: "e30fac11-e18c-49f1-9a27-97116f956c57", name: "Aveia em Flocos", amount: [], unit: "Un", tag: "2714c5fe-9df7-4c1a-a486-00b9eb0eb030" },
  // Barras de Cereal
  { uuid: "f9bfbf91-cdba-4101-ab6a-894a5e669d01", name: "Barra de Cereal de Chocolate", amount: [], unit: "Un", tag: "7966eee7-f7fc-4306-8776-6e6a1dd1ce03" },
  { uuid: "8a4ac80e-907c-4a88-8261-bea8421c7544", name: "Barra de Cereal de Frutas", amount: [], unit: "Un", tag: "7966eee7-f7fc-4306-8776-6e6a1dd1ce03" },
  // Adoçantes e Açúcar
  { uuid: "2a299f6a-7d61-4c64-9946-8bb894547013", name: "Açúcar Refinado", amount: [], unit: "Un", tag: "8b96cdee-544f-4910-a69a-1cb530c4d58c" },
  { uuid: "298f8df8-de07-4915-9e88-0a59e0243650", name: "Açúcar Cristal", amount: [], unit: "Un", tag: "8b96cdee-544f-4910-a69a-1cb530c4d58c" },
  { uuid: "3e9fd44d-d9b2-4452-bb0d-0f775f45e261", name: "Adoçante Líquido", amount: [], unit: "Un", tag: "8b96cdee-544f-4910-a69a-1cb530c4d58c" },
  // Bebidas Não Alcoólicas
  { uuid: "8714416d-b064-4ee1-8dd9-c9ac65ee2e36", name: "Chá Gelado", amount: [], unit: "Un", tag: "a4e2b3a0-b947-414e-92ca-2e333d550942" },
  { uuid: "7000ac73-23fd-4f2a-a0bf-220e793d3100", name: "Isotônico", amount: [], unit: "Un", tag: "a4e2b3a0-b947-414e-92ca-2e333d550942" },
  // Sucos
  { uuid: "9b6ffb4a-d643-465d-8c53-03039e2cbe00", name: "Suco de Laranja", amount: [], unit: "Un", tag: "04cc94b9-3916-416f-ab0e-240690e167f1" },
  { uuid: "b451c943-f0be-46a0-965e-ca5f19abb794", name: "Suco de Uva", amount: [], unit: "Un", tag: "04cc94b9-3916-416f-ab0e-240690e167f1" },
  { uuid: "0d7e3457-8596-469c-bf0d-61b29e229f8b", name: "Suco em Pó", amount: [], unit: "Un", tag: "04cc94b9-3916-416f-ab0e-240690e167f1" },
  // Refrigerantes
  { uuid: "2231daf1-9e73-4076-920a-e75db01f1c7b", name: "Refrigerante Cola", amount: [], unit: "Un", tag: "f8d353e3-af42-4eb4-9ab0-60963df2e855" },
  { uuid: "cf9f29e8-6480-4e4b-90a7-834f6b518dd6", name: "Refrigerante Guaraná", amount: [], unit: "Un", tag: "f8d353e3-af42-4eb4-9ab0-60963df2e855" },
  { uuid: "ca043c48-8e24-4f78-91bc-1eaa3fea18fa", name: "Refrigerante Limão", amount: [], unit: "Un", tag: "f8d353e3-af42-4eb4-9ab0-60963df2e855" },
  // Águas
  { uuid: "a52faec0-f872-4e5f-a312-5e26c6567b38", name: "Água Mineral sem Gás", amount: [], unit: "Un", tag: "b5e0ba6c-b74c-4f22-9fab-4c8ebddcfe01" },
  { uuid: "b4e02509-788c-49b6-a023-3b7960673e33", name: "Água Mineral com Gás", amount: [], unit: "Un", tag: "b5e0ba6c-b74c-4f22-9fab-4c8ebddcfe01" },
  { uuid: "686121d8-3e92-4462-aa59-7b7167ab9511", name: "Água de Coco", amount: [], unit: "Un", tag: "b5e0ba6c-b74c-4f22-9fab-4c8ebddcfe01" },
  // Bebidas Alcoólicas
  { uuid: "f192a3bb-e8dd-43be-bd9e-fafdc3e2ec33", name: "Vodka", amount: [], unit: "Un", tag: "681a86ae-277b-48fa-b672-f7842f31145d" },
  { uuid: "fbdf47d4-9d70-49b1-998c-496246d15b41", name: "Gin", amount: [], unit: "Un", tag: "681a86ae-277b-48fa-b672-f7842f31145d" },
  // Cervejas
  { uuid: "adf14c69-19ac-4ba0-8c84-f03e072ce292", name: "Cerveja Pilsen", amount: [], unit: "Un", tag: "da30c8e7-bc33-4d2f-aff7-40155bb1df4e" },
  { uuid: "7eeae2b5-49f4-4c42-9850-48e85cbc3ba7", name: "Cerveja IPA", amount: [], unit: "Un", tag: "da30c8e7-bc33-4d2f-aff7-40155bb1df4e" },
  { uuid: "5226e09a-1442-4e78-b614-7fdd9333e915", name: "Cerveja Sem Álcool", amount: [], unit: "Un", tag: "da30c8e7-bc33-4d2f-aff7-40155bb1df4e" },
  // Vinhos
  { uuid: "caaae433-c1e1-450b-a065-fbd1bc0f6f80", name: "Vinho Tinto Seco", amount: [], unit: "Un", tag: "1975bd87-4afc-4331-86ee-49ee7f1409ef" },
  { uuid: "9677c55e-f3d0-43f7-a9a8-74ebe6144389", name: "Vinho Branco Suave", amount: [], unit: "Un", tag: "1975bd87-4afc-4331-86ee-49ee7f1409ef" },
  // Destilados
  { uuid: "279ecaf6-5855-4f8e-a2bc-d6b324eee8b9", name: "Whisky", amount: [], unit: "Un", tag: "a8a901f0-32f7-4361-84cc-7b0b1afbc88e" },
  { uuid: "9e2dc607-bce0-4c4e-a174-aef904202453", name: "Cachaça", amount: [], unit: "Un", tag: "a8a901f0-32f7-4361-84cc-7b0b1afbc88e" },
  { uuid: "21628a75-d27f-4b99-b353-ac22faf41e7f", name: "Rum", amount: [], unit: "Un", tag: "a8a901f0-32f7-4361-84cc-7b0b1afbc88e" },
  // Higiene Pessoal
  { uuid: "7abdef61-fc27-4e96-b300-d6b356cae1d5", name: "Sabonete", amount: [], unit: "Un", tag: "5cc01b89-488e-4575-bf5f-3ea899af3d93" },
  { uuid: "83fb179e-bf5b-402d-974a-4bab77e3e4fd", name: "Desodorante", amount: [], unit: "Un", tag: "5cc01b89-488e-4575-bf5f-3ea899af3d93" },
  { uuid: "c5666c41-7cfc-4b02-86bb-64cc4da074c2", name: "Papel Higiênico", amount: [], unit: "Un", tag: "5cc01b89-488e-4575-bf5f-3ea899af3d93" },
  { uuid: "407812fa-9798-4942-8d09-547cf257466c", name: "Absorvente", amount: [], unit: "Un", tag: "5cc01b89-488e-4575-bf5f-3ea899af3d93" },
  // Cuidados com o Cabelo
  { uuid: "4f182d55-bf72-4472-b2e0-fa666b956bff", name: "Shampoo", amount: [], unit: "Un", tag: "0b4c8db4-89b1-4e01-ae3f-5410169aabd1" },
  { uuid: "a903b717-c0d2-456d-bf71-e95c7a360589", name: "Condicionador", amount: [], unit: "Un", tag: "0b4c8db4-89b1-4e01-ae3f-5410169aabd1" },
  { uuid: "571c2692-51ef-47b1-9abb-f95079aa3fad", name: "Creme para Pentear", amount: [], unit: "Un", tag: "0b4c8db4-89b1-4e01-ae3f-5410169aabd1" },
  // Cuidados Bucais
  { uuid: "74606695-2ea2-43b5-86df-2c0fc153e9ac", name: "Creme Dental", amount: [], unit: "Un", tag: "fd8c87ba-d98b-4cf1-9449-2eff1558817b" },
  { uuid: "89b8d104-4b60-4ded-b841-fdbe2696e712", name: "Escova de Dente", amount: [], unit: "Un", tag: "fd8c87ba-d98b-4cf1-9449-2eff1558817b" },
  { uuid: "eddc29ca-811d-4ede-b546-ec87f35caa9e", name: "Enxaguante Bucal", amount: [], unit: "Un", tag: "fd8c87ba-d98b-4cf1-9449-2eff1558817b" },
  { uuid: "eb69b9bd-a119-4548-a4f6-1cba85221183", name: "Fio Dental", amount: [], unit: "Un", tag: "fd8c87ba-d98b-4cf1-9449-2eff1558817b" },
  // Cosméticos
  { uuid: "89a2a0ce-ee1f-49aa-be38-58386aa4ca90", name: "Protetor Solar", amount: [], unit: "Un", tag: "9760e20a-2dc6-40fa-a073-4c3a5e2f7229" },
  { uuid: "5c0322bb-0b48-4e3d-aa84-cf884ad3d2c6", name: "Hidratante Corporal", amount: [], unit: "Un", tag: "9760e20a-2dc6-40fa-a073-4c3a5e2f7229" },
  { uuid: "97fd41ee-8dca-4483-b698-bb3b47f611e1", name: "Batom", amount: [], unit: "Un", tag: "9760e20a-2dc6-40fa-a073-4c3a5e2f7229" },
  // Fraldas e Higiene Infantil
  { uuid: "5ee32da2-aa7e-4e14-98ed-02054bbcda56", name: "Fralda Descartável", amount: [], unit: "Un", tag: "b8507853-0c59-4549-adcb-3856c650ebaa" },
  { uuid: "b845539c-4190-4753-b597-06afc4c47373", name: "Lenço Umedecido", amount: [], unit: "Un", tag: "b8507853-0c59-4549-adcb-3856c650ebaa" },
  // Papelaria
  { uuid: "14cb8154-16a0-4e09-86bd-48282ab8716d", name: "Caderno", amount: [], unit: "Un", tag: "ffa261aa-fce2-4388-95c3-d116a1311611" },
  { uuid: "3347633a-ae23-4988-8d2c-cf21aecca0a9", name: "Caneta", amount: [], unit: "Un", tag: "ffa261aa-fce2-4388-95c3-d116a1311611" },
  { uuid: "868243d4-1afc-40ac-a5ab-e20f19c364fd", name: "Papel Sulfite", amount: [], unit: "Un", tag: "ffa261aa-fce2-4388-95c3-d116a1311611" },
  // Limpeza
  { uuid: "80fed7c9-c7ab-4a44-8346-f6b961316764", name: "Detergente", amount: [], unit: "Un", tag: "8a04df8d-da0f-4806-9015-b9b0a17afc67" },
  { uuid: "fc2421bf-35e7-40cd-87fa-81b71b785969", name: "Água Sanitária", amount: [], unit: "Un", tag: "8a04df8d-da0f-4806-9015-b9b0a17afc67" },
  { uuid: "5485ce9d-93bf-42fb-9df3-e816987a18a4", name: "Desinfetante", amount: [], unit: "Un", tag: "8a04df8d-da0f-4806-9015-b9b0a17afc67" },
  { uuid: "52d4c6d3-2a1b-4286-bd2f-ae7f16bcf758", name: "Sabão em Barra", amount: [], unit: "Un", tag: "8a04df8d-da0f-4806-9015-b9b0a17afc67" },
  // Limpeza de Roupas
  { uuid: "fda4cb69-fb71-4505-b51a-818dcbae5181", name: "Sabão em Pó", amount: [], unit: "Un", tag: "5adb02f0-8865-450b-8ec6-0042c9217482" },
  { uuid: "7f0c2b15-3267-4a5d-9912-b7fe6a98e542", name: "Amaciante", amount: [], unit: "Un", tag: "5adb02f0-8865-450b-8ec6-0042c9217482" },
  { uuid: "825cc530-7b15-4d80-83b4-115f5460aafe", name: "Alvejante", amount: [], unit: "Un", tag: "5adb02f0-8865-450b-8ec6-0042c9217482" },
  // Utensílios de Limpeza
  { uuid: "9d8b4463-3c23-44c2-9242-c2772a27b95b", name: "Vassoura", amount: [], unit: "Un", tag: "69880bc2-bff4-4487-bde4-a632903f57a5" },
  { uuid: "5e4d763a-3c40-47b6-b138-87a4ec1430f6", name: "Pano de Chão", amount: [], unit: "Un", tag: "69880bc2-bff4-4487-bde4-a632903f57a5" },
  { uuid: "d122b55e-c998-4334-a598-748734cde19f", name: "Esponja de Aço", amount: [], unit: "Un", tag: "69880bc2-bff4-4487-bde4-a632903f57a5" },
  // Descartáveis
  { uuid: "f18e9ff3-ff3a-4248-b06d-cc30c7014117", name: "Copo Descartável", amount: [], unit: "Un", tag: "cdda05f1-c716-4b0a-b0f9-39382f863277" },
  { uuid: "a4c73e33-7aa9-43fc-97f8-4fc708100242", name: "Prato Descartável", amount: [], unit: "Un", tag: "cdda05f1-c716-4b0a-b0f9-39382f863277" },
  { uuid: "707b31e1-9343-44e6-aad2-3ccb929c7512", name: "Guardanapo de Papel", amount: [], unit: "Un", tag: "cdda05f1-c716-4b0a-b0f9-39382f863277" },
  // Pet Shop
  { uuid: "d1f0d0bf-0785-4e9b-b4cf-97bb5b287c39", name: "Ração para Cães", amount: [], unit: "Un", tag: "69a97021-7717-4785-8c11-b5fb78aedfee" },
  { uuid: "73c24440-44f4-47f9-bd68-24f29b5776d6", name: "Ração para Gatos", amount: [], unit: "Un", tag: "69a97021-7717-4785-8c11-b5fb78aedfee" },
  { uuid: "6ddbbc17-3a0f-4149-bc15-cb93bdc31cfc", name: "Areia Sanitária", amount: [], unit: "Un", tag: "69a97021-7717-4785-8c11-b5fb78aedfee" },
  // Bebês
  { uuid: "5c9eab2d-9177-43c8-adef-a797c162d077", name: "Lenço Umedecido Infantil", amount: [], unit: "Un", tag: "3c11d710-379a-4d23-8d56-0308f24cc65e" },
  { uuid: "760477ef-9422-4334-8aa4-7212cf1adf66", name: "Pomada para Assadura", amount: [], unit: "Un", tag: "3c11d710-379a-4d23-8d56-0308f24cc65e" },
  // Alimentos Infantis
  { uuid: "e2f5d161-eb5d-4785-898e-05a82e4477e3", name: "Papinha", amount: [], unit: "Un", tag: "f7d8275a-47be-4d73-af06-51733fd1f457" },
  { uuid: "c3ce5c10-fdbb-4025-b220-c7e50141f839", name: "Fórmula Infantil", amount: [], unit: "Un", tag: "f7d8275a-47be-4d73-af06-51733fd1f457" },
  { uuid: "dd91a61b-b0f9-4064-be19-a8f704a9cdc6", name: "Bolacha Infantil", amount: [], unit: "Un", tag: "f7d8275a-47be-4d73-af06-51733fd1f457" },
  // Alimentos Naturais e Integrais
  { uuid: "e7433bbb-6fdd-46d6-ba61-114dd2ffdff4", name: "Arroz Integral", amount: [], unit: "Un", tag: "56f4234d-3917-40b1-b958-80c1433e559b" },
  { uuid: "c0e9a730-539a-476b-b45f-3573af3eac56", name: "Pão Integral (natural)", amount: [], unit: "Un", tag: "56f4234d-3917-40b1-b958-80c1433e559b" },
  { uuid: "0988bf16-55d6-4707-a215-6323edfb5af4", name: "Castanhas", amount: [], unit: "Un", tag: "56f4234d-3917-40b1-b958-80c1433e559b" },
  // Alimentos Diet e Light
  { uuid: "cf483531-5955-4661-8c0c-57a5a762d24e", name: "Refrigerante Zero", amount: [], unit: "Un", tag: "f96219d4-7c2e-44e0-b2bf-5da32f3ca45e" },
  { uuid: "bad11949-5d20-4a40-b01e-5860c969a649", name: "Geleia Diet", amount: [], unit: "Un", tag: "f96219d4-7c2e-44e0-b2bf-5da32f3ca45e" },
  { uuid: "5ce57cca-0362-42f0-b19c-b1d594d59fa0", name: "Chocolate Diet", amount: [], unit: "Un", tag: "f96219d4-7c2e-44e0-b2bf-5da32f3ca45e" },
  // Alimentos Veganos
  { uuid: "cdfbfeba-3d9c-4473-8f54-90a2241a4b4b", name: "Leite Vegetal", amount: [], unit: "Un", tag: "d9f1131c-48b4-47e1-aa52-a81459f76c96" },
  { uuid: "b8c16e9e-0b01-48f9-bfce-5a515fa8e024", name: "Hambúrguer Vegetal", amount: [], unit: "Un", tag: "d9f1131c-48b4-47e1-aa52-a81459f76c96" },
  { uuid: "8c560424-21b9-4f5a-885a-95894e5d3d16", name: "Queijo Vegano", amount: [], unit: "Un", tag: "d9f1131c-48b4-47e1-aa52-a81459f76c96" },
  // Utilidades Domésticas
  { uuid: "af8a3db2-6674-4746-81f6-66f2d4a5b4f9", name: "Vela", amount: [], unit: "Un", tag: "519f2cc2-b6f0-4c16-89b6-0cd51b7e19d0" },
  { uuid: "2ab134ed-336a-4464-9684-2aede605a79d", name: "Fósforo", amount: [], unit: "Un", tag: "519f2cc2-b6f0-4c16-89b6-0cd51b7e19d0" },
  { uuid: "ccb951e6-25c7-4147-bd9d-940f3a9376de", name: "Pilha", amount: [], unit: "Un", tag: "519f2cc2-b6f0-4c16-89b6-0cd51b7e19d0" },
  // Utensílios de Cozinha
  { uuid: "c763ce84-841d-4fd8-987d-823a09de3b22", name: "Panela", amount: [], unit: "Un", tag: "d3a3a92b-647a-4fc7-b647-b59edce1f5f6" },
  { uuid: "e70bd022-e9e4-4db1-89fd-b013ff875b8c", name: "Frigideira", amount: [], unit: "Un", tag: "d3a3a92b-647a-4fc7-b647-b59edce1f5f6" },
  { uuid: "18f45454-d28a-44b6-b73c-d66cc087a7c8", name: "Faca de Cozinha", amount: [], unit: "Un", tag: "d3a3a92b-647a-4fc7-b647-b59edce1f5f6" },
  // Eletroportáteis
  { uuid: "e281d747-12a4-4da0-98e8-248d6fee8bf6", name: "Liquidificador", amount: [], unit: "Un", tag: "de8355eb-9b80-44e9-aa67-7d33231c87c8" },
  { uuid: "aee05f96-f778-4079-8ebf-5524e150f862", name: "Cafeteira Elétrica", amount: [], unit: "Un", tag: "de8355eb-9b80-44e9-aa67-7d33231c87c8" },
  // Churrasco
  { uuid: "6e957235-0548-49d8-89f4-415efe4a50f1", name: "Carvão", amount: [], unit: "Un", tag: "f769c0f0-fbd0-4650-aae9-1ddefac5d9bc" },
  { uuid: "1efba940-123f-47f5-8582-fa0ba05d2141", name: "Sal Grosso", amount: [], unit: "Un", tag: "f769c0f0-fbd0-4650-aae9-1ddefac5d9bc" },
  { uuid: "b8c190a3-2792-4626-beb9-d6d6931b2c84", name: "Espeto de Churrasco", amount: [], unit: "Un", tag: "f769c0f0-fbd0-4650-aae9-1ddefac5d9bc" },
  // Padaria Industrializada
  { uuid: "17770549-2621-4cff-821e-0b5e5716a132", name: "Torrada", amount: [], unit: "Un", tag: "5d2a260d-1537-44fe-bacd-85098523adaa" },
  { uuid: "ae8879d2-4fd4-4aa8-99c2-928c27c3604c", name: "Pão de Alho Congelado", amount: [], unit: "Un", tag: "5d2a260d-1537-44fe-bacd-85098523adaa" },
  { uuid: "a6f6f188-fbff-441c-90f2-dfbb96cfc0e5", name: "Grissini", amount: [], unit: "Un", tag: "5d2a260d-1537-44fe-bacd-85098523adaa" },
  // Temperos e Especiarias
  { uuid: "227ff2e2-6dd1-447d-96a7-b9a151699c26", name: "Sal Refinado", amount: [], unit: "Un", tag: "724b01b4-5bd1-4ae4-9823-90d6ecaafcaa" },
  { uuid: "5a34d78f-c9a5-44fe-b99a-75cf05ff13e6", name: "Pimenta do Reino", amount: [], unit: "Un", tag: "724b01b4-5bd1-4ae4-9823-90d6ecaafcaa" },
  { uuid: "a63bb09a-ca4b-4ddc-bafb-04efe3e884b1", name: "Orégano", amount: [], unit: "Un", tag: "724b01b4-5bd1-4ae4-9823-90d6ecaafcaa" },
  { uuid: "763f91a4-1dbf-426d-9c15-43022d76c49d", name: "Colorau", amount: [], unit: "Un", tag: "724b01b4-5bd1-4ae4-9823-90d6ecaafcaa" },
  // Farmácia
  { uuid: "c51d51d9-b72e-45e1-b89a-5400a303f7af", name: "Analgésico", amount: [], unit: "Un", tag: "13de2483-f0d9-474f-8d44-d8d79ed28721" },
  { uuid: "7d549275-a763-4ba7-ac19-761001ca5180", name: "Álcool em Gel", amount: [], unit: "Un", tag: "13de2483-f0d9-474f-8d44-d8d79ed28721" },
  { uuid: "9a282732-9e40-4ac1-8a30-ff7a061de6e2", name: "Curativo Adesivo", amount: [], unit: "Un", tag: "13de2483-f0d9-474f-8d44-d8d79ed28721" },
  // Vitaminas e Suplementos
  { uuid: "a4de8237-b9a5-4f04-9fef-2c7840cfc39a", name: "Vitamina C", amount: [], unit: "Un", tag: "9ebd452d-e87c-4a44-a420-3544f97dd3b5" },
  { uuid: "2c568805-574a-435b-ad94-5627b7973738", name: "Whey Protein", amount: [], unit: "Un", tag: "9ebd452d-e87c-4a44-a420-3544f97dd3b5" },
  { uuid: "37adaa5d-6d20-47f0-af07-8cdbc2df5941", name: "Multivitamínico", amount: [], unit: "Un", tag: "9ebd452d-e87c-4a44-a420-3544f97dd3b5" },
  // Jardinagem
  { uuid: "0ce224ee-71cd-4342-8bfa-1b1047594cd0", name: "Terra Adubada", amount: [], unit: "Un", tag: "f7a56c10-3858-4f9b-a692-a912012d4fcc" },
  { uuid: "9675b395-6ed6-4bbe-8420-e208a61581ce", name: "Fertilizante", amount: [], unit: "Un", tag: "f7a56c10-3858-4f9b-a692-a912012d4fcc" },
  { uuid: "e2167b5b-edf4-4b87-8018-3fe1e49bb3f9", name: "Vaso de Planta", amount: [], unit: "Un", tag: "f7a56c10-3858-4f9b-a692-a912012d4fcc" },
  // Automotivo
  { uuid: "c21d827c-0a99-44bf-b9e9-dde84745c7ca", name: "Óleo de Motor", amount: [], unit: "Un", tag: "dc4642ba-9b4c-426b-b5ee-ce6ff29712be" },
  { uuid: "d1842ab2-64e3-46fd-9dc4-e297791349c6", name: "Água para Radiador", amount: [], unit: "Un", tag: "dc4642ba-9b4c-426b-b5ee-ce6ff29712be" },
  { uuid: "4396a087-9f3b-438f-8dd4-58905a534517", name: "Aromatizante de Carro", amount: [], unit: "Un", tag: "dc4642ba-9b4c-426b-b5ee-ce6ff29712be" },
  // Ferramentas
  { uuid: "413d7832-1183-49d2-8785-4b46c846b882", name: "Chave de Fenda", amount: [], unit: "Un", tag: "a71bcec8-5ab8-42a2-914d-94c1414eae4c" },
  { uuid: "17a5c564-3fdf-4853-a109-cb962059843a", name: "Martelo", amount: [], unit: "Un", tag: "a71bcec8-5ab8-42a2-914d-94c1414eae4c" },
  { uuid: "912c340c-ba2a-4c67-a048-f8443d66d39b", name: "Fita Isolante", amount: [], unit: "Un", tag: "a71bcec8-5ab8-42a2-914d-94c1414eae4c" },
  // Vestuário
  { uuid: "e4100f3d-baf8-4134-a248-f7946259eac3", name: "Meia", amount: [], unit: "Un", tag: "2fca2fec-b8d6-4ee3-b1cb-076cb2d4b8eb" },
  { uuid: "9c455a2b-aa8b-4d3a-a734-a907c42d0d8c", name: "Camiseta Básica", amount: [], unit: "Un", tag: "2fca2fec-b8d6-4ee3-b1cb-076cb2d4b8eb" },
  // Brinquedos
  { uuid: "52a49b10-faf1-44ba-ae48-436a2e1b998a", name: "Bola", amount: [], unit: "Un", tag: "f0a1f734-4b44-4549-8b96-9f1b8a988fe8" },
  { uuid: "26d7b8f5-c24f-4c2e-bd14-9224663e9881", name: "Boneca", amount: [], unit: "Un", tag: "f0a1f734-4b44-4549-8b96-9f1b8a988fe8" },
  { uuid: "632942f9-218b-4371-a47b-d2a86c4faa62", name: "Carrinho de Brinquedo", amount: [], unit: "Un", tag: "f0a1f734-4b44-4549-8b96-9f1b8a988fe8" },
];

// Produtos complementares para tornar a busca e a seleção de itens mais úteis
// em todas as categorias disponíveis no mock.
const additionalProductsByTag: Array<[string, string[]]> = [
  ["fd4737cb-212c-42b2-9179-85319ee229d7", ["Abacaxi", "Abacate", "Açaí", "Ameixa", "Caqui", "Goiaba", "Kiwi", "Limão", "Manga", "Maracujá", "Melancia", "Melão", "Morango", "Pera", "Pêssego", "Tangerina"]],
  ["b1cde2c0-169c-4aa4-8b73-f29b13a8f43e", ["Agrião", "Acelga", "Almeirão", "Brócolis", "Cebolinha", "Coentro", "Couve-flor", "Escarola", "Manjericão", "Repolho", "Salsinha", "Salsão"]],
  ["0c26d9fa-4e39-440f-883d-630d148909b3", ["Abobrinha", "Abóbora", "Beterraba", "Berinjela", "Chuchu", "Inhame", "Mandioca", "Milho Verde", "Pepino", "Quiabo", "Rabanete", "Vagem"]],
  ["4e57daa4-d511-445d-af87-1574ea193a7a", ["Ovo de Codorna", "Ovo Orgânico", "Ovo Pasteurizado", "Clara de Ovo", "Gema de Ovo", "Ovo de Pata"]],
  ["a6b87490-bb3d-4edf-a4b0-054cc0aa31a2", ["Acém", "Bisteca Suína", "Carne Moída", "Coxão Mole", "Cupim", "Filé Mignon", "Fraldinha", "Maminha", "Patinho", "Peito de Frango", "Pernil Suíno", "Sobrecoxa de Frango"]],
  ["f4e0184d-31a2-41e0-8797-9d4cd13a7ba4", ["Bacalhau", "Cação", "Lula", "Merluza", "Mexilhão", "Pescada", "Polvo", "Sardinha Fresca"]],
  ["c2cc6eb8-4078-4452-bdc9-34a445c8d7e4", ["Bacon", "Blanquet de Peru", "Copa", "Linguiça Calabresa", "Lombo Canadense", "Paio", "Peperoni", "Salsicha"]],
  ["1ccf5184-1699-4eb7-a045-1f0e8d180668", ["Leite Desnatado", "Leite Semidesnatado", "Leite sem Lactose", "Leite em Pó", "Nata", "Requeijão", "Ricota", "Bebida Láctea"]],
  ["15ebdab6-07f5-46d2-b8d9-8ace1da1147e", ["Queijo Brie", "Queijo Coalho", "Queijo Cottage", "Queijo Gorgonzola", "Queijo Minas", "Queijo Provolone", "Queijo Reino", "Queijo Cottage Light"]],
  ["6ff48e61-60cc-4903-8242-8e5d563fee19", ["Iogurte de Baunilha", "Iogurte de Coco", "Iogurte de Pêssego", "Iogurte sem Lactose", "Iogurte Zero", "Kefir", "Yakult", "Iogurte Proteico"]],
  ["c954cd8c-fa6f-4f05-b79e-fbd79df01ebb", ["Manteiga com Sal", "Manteiga sem Sal", "Margarina Light", "Margarina sem Sal", "Ghee", "Creme Vegetal"]],
  ["1d55aea1-4345-49be-89d8-80a95eb2fc10", ["Baguete", "Bisnaguinha", "Croissant", "Pão de Batata", "Pão de Queijo", "Pão Sírio", "Pão Australiano", "Sonho"]],
  ["5850dbcc-ade7-45e0-a2ef-1628cee53e23", ["Bolo de Cenoura", "Bolo de Fubá", "Bolo Inglês", "Brigadeiro", "Cupcake", "Éclair", "Pavê", "Torta de Morango"]],
  ["6535389a-76b2-4bfb-98e6-7dfa8acdf23f", ["Hambúrguer Congelado", "Nuggets", "Pão de Queijo Congelado", "Polpa de Fruta", "Sopa Congelada", "Vegetais Congelados", "Waffle Congelado", "Açaí Congelado"]],
  ["c9c3e4f4-800d-49b4-8e53-740ff911b875", ["Sorvete de Morango", "Sorvete de Flocos", "Sorvete Napolitano", "Sorbet de Limão", "Picolé de Fruta", "Picolé de Chocolate"]],
  ["5c5465dd-fbd2-4c42-88c8-b026aa7dcd5e", ["Macarrão Penne", "Macarrão Ninho", "Macarrão Talharim", "Macarrão Integral", "Massa para Pastel", "Massa para Pizza", "Nhoque", "Ravioli"]],
  ["0888ede8-66a1-41a3-b268-bb0d9fa924f8", ["Arroz Parboilizado", "Arroz Arbóreo", "Arroz para Sushi", "Feijão Branco", "Feijão Fradinho", "Feijão Vermelho", "Feijão de Corda", "Arroz Integral Orgânico"]],
  ["c203cd29-5288-4ebd-ba5e-fd129eac62e4", ["Amaranto", "Cevada", "Ervilha Seca", "Linhaça", "Quinoa", "Soja em Grãos", "Trigo para Quibe", "Canjica"]],
  ["de5fd946-55d0-40b5-b836-9333b564facf", ["Farinha de Arroz", "Farinha de Milho", "Farinha de Rosca", "Polvilho Azedo", "Polvilho Doce", "Tapioca", "Mistura para Bolo", "Farinha Integral"]],
  ["0feb21cb-2960-4aff-9e99-0e9547cbc745", ["Óleo de Canola", "Óleo de Girassol", "Óleo de Milho", "Óleo de Coco", "Azeite Extravirgem", "Azeite Trufado", "Óleo de Gergelim", "Óleo de Linhaça"]],
  ["8699278e-6b17-43da-b688-3b3562d15df7", ["Barbecue", "Molho Inglês", "Molho Shoyu", "Molho de Pimenta", "Molho para Salada", "Pesto", "Vinagre", "Vinagre Balsâmico"]],
  ["fe35983e-d971-4fc3-990b-2ce706e28428", ["Azeitona", "Cogumelo em Conserva", "Palmito", "Sardinha em Lata", "Seleta de Legumes", "Tomate Pelado", "Pepino em Conserva", "Feijoada em Lata"]],
  ["31f00cd5-6423-4447-a8ba-6f0bffa556f3", ["Caldo de Carne", "Caldo de Galinha", "Creme de Milho", "Creme de Queijo", "Sopa de Ervilha", "Sopa de Galinha", "Sopa de Tomate", "Sopa Instantânea"]],
  ["a8ecbe0e-8ad0-41e4-9b99-f6daf743bd48", ["Café em Cápsulas", "Café Solúvel", "Cappuccino", "Chá Verde", "Chá de Hortelã", "Chá de Erva-doce", "Chá Preto", "Chimarrão"]],
  ["2932ace5-453f-4532-8bd7-9200afa283e0", ["Cacau em Pó", "Chocolate em Pó", "Toddynho", "Bebida de Cacau", "Achocolatado Diet", "Achocolatado Zero"]],
  ["46bb1bb8-1189-446d-8341-33c02119bac5", ["Biscoito de Polvilho", "Biscoito Integral", "Biscoito de Arroz", "Cookie", "Cream Cracker", "Rosquinha", "Wafer", "Torradinha"]],
  ["8d5aa568-c7ec-412d-91ab-7c86f74dc78a", ["Gelatina", "Geleia", "Marshmallow", "Mel", "Paçoca", "Pé de Moleque", "Sagu", "Suspiro"]],
  ["417fdaa8-64fe-46cd-b41f-9658efba551b", ["Chocolate Branco", "Chocolate Meio Amargo", "Chocolate em Barra", "Chocolate para Cobertura", "Trufa", "Ovo de Páscoa", "Gotas de Chocolate", "Chocolate 70% Cacau"]],
  ["ec7e2516-d4e4-4eeb-9dc8-9dfabae543be", ["Bala de Hortelã", "Bala de Caramelo", "Chiclete sem Açúcar", "Jujuba", "Pastilha", "Torrone", "Doce de Amendoim", "Maria Mole"]],
  ["54980d26-f802-40ec-a25f-eac767502f4c", ["Amendoim", "Baconzitos", "Nachos", "Pipoca Pronta", "Salgadinho de Queijo", "Torrone Salgado", "Mix de Nuts", "Biscoito Salgado"]],
  ["2714c5fe-9df7-4c1a-a486-00b9eb0eb030", ["Cereal de Chocolate", "Cereal de Milho", "Muesli", "Farelo de Aveia", "Flocos de Milho", "Mix de Cereais", "Aveia Instantânea", "Cereal sem Açúcar"]],
  ["7966eee7-f7fc-4306-8776-6e6a1dd1ce03", ["Barra de Banana", "Barra de Castanhas", "Barra de Proteína", "Barra de Aveia", "Barra sem Açúcar", "Barra de Amendoim"]],
  ["8b96cdee-544f-4910-a69a-1cb530c4d58c", ["Açúcar Mascavo", "Açúcar Demerara", "Açúcar de Confeiteiro", "Adoçante em Pó", "Stevia", "Xilitol", "Melado", "Eritritol"]],
  ["a4e2b3a0-b947-414e-92ca-2e333d550942", ["Energético", "Água Tônica", "Bebida Energética", "Kombucha", "Néctar de Fruta", "Bebida de Soja", "Chá Pronto", "Isotônico Zero"]],
  ["04cc94b9-3916-416f-ab0e-240690e167f1", ["Suco de Maçã", "Suco de Manga", "Suco de Maracujá", "Suco de Pêssego", "Suco de Abacaxi", "Suco Integral", "Suco Detox", "Água de Coco Integral"]],
  ["f8d353e3-af42-4eb4-9ab0-60963df2e855", ["Refrigerante Laranja", "Refrigerante Uva", "Refrigerante Cola Zero", "Refrigerante Guaraná Zero", "Refrigerante Tônica", "Refrigerante Ginger Ale"]],
  ["b5e0ba6c-b74c-4f22-9fab-4c8ebddcfe01", ["Água Mineral 5L", "Água com Gás Limão", "Água Saborizada", "Água Alcalina", "Água Tônica", "Água de Coco Caixinha"]],
  ["681a86ae-277b-48fa-b672-f7842f31145d", ["Licor", "Saquê", "Tequila", "Vermute", "Conhaque", "Sidra", "Aperitivo", "Espumante"]],
  ["da30c8e7-bc33-4d2f-aff7-40155bb1df4e", ["Cerveja Lager", "Cerveja Weiss", "Cerveja Stout", "Cerveja Pale Ale", "Cerveja Porter", "Cerveja Puro Malte", "Cerveja Malzbier", "Cerveja Session IPA"]],
  ["1975bd87-4afc-4331-86ee-49ee7f1409ef", ["Vinho Rosé", "Vinho do Porto", "Vinho Malbec", "Vinho Cabernet", "Vinho Merlot", "Vinho Chardonnay", "Vinho Espumante", "Vinho Frisante"]],
  ["a8a901f0-32f7-4361-84cc-7b0b1afbc88e", ["Bourbon", "Brandy", "Cointreau", "Licor de Café", "Tequila Prata", "Whisky Bourbon", "Whisky Escocês", "Cachaça Envelhecida"]],
  ["5cc01b89-488e-4575-bf5f-3ea899af3d93", ["Algodão", "Aparelho de Barbear", "Cotonete", "Desodorante Aerosol", "Lâmina de Barbear", "Papel Toalha", "Sabonete Líquido", "Talco"]],
  ["0b4c8db4-89b1-4e01-ae3f-5410169aabd1", ["Máscara Capilar", "Óleo Capilar", "Tonalizante", "Tintura", "Gel para Cabelo", "Spray Fixador", "Shampoo Anticaspa", "Leave-in"]],
  ["fd8c87ba-d98b-4cf1-9449-2eff1558817b", ["Escova Elétrica", "Escova Infantil", "Pasta de Dente Infantil", "Limpador de Língua", "Fita Dental", "Clareador Dental", "Antisséptico Bucal", "Escova Interdental"]],
  ["9760e20a-2dc6-40fa-a073-4c3a5e2f7229", ["Base Facial", "Corretivo", "Demaquilante", "Esmalte", "Perfume", "Pó Compacto", "Protetor Labial", "Sérum Facial"]],
  ["b8507853-0c59-4549-adcb-3856c650ebaa", ["Fralda para Natação", "Fralda de Pano", "Shampoo Infantil", "Sabonete Infantil", "Colônia Infantil", "Hastes Flexíveis", "Algodão Infantil", "Kit Higiene Infantil"]],
  ["ffa261aa-fce2-4388-95c3-d116a1311611", ["Apontador", "Borracha", "Lápis", "Marcador de Texto", "Régua", "Tesoura", "Cola Branca", "Estojo"]],
  ["8a04df8d-da0f-4806-9015-b9b0a17afc67", ["Limpador Multiuso", "Limpa Vidros", "Limpa Forno", "Lustra Móveis", "Saponáceo", "Desengordurante", "Limpa Piso", "Pastilha Sanitária"]],
  ["5adb02f0-8865-450b-8ec6-0042c9217482", ["Sabão Líquido", "Tira-Manchas", "Amaciante Concentrado", "Alvejante sem Cloro", "Sabão para Roupas Delicadas", "Neutralizador de Odores"]],
  ["69880bc2-bff4-4487-bde4-a632903f57a5", ["Rodo", "Balde", "Pá de Lixo", "Esponja", "Flanela", "Luva de Borracha", "Mop", "Pano de Microfibra"]],
  ["cdda05f1-c716-4b0a-b0f9-39382f863277", ["Talher Descartável", "Marmita de Alumínio", "Saco para Lixo", "Filme Plástico", "Papel Alumínio", "Papel Manteiga", "Canudo", "Palito de Dente"]],
  ["69a97021-7717-4785-8c11-b5fb78aedfee", ["Petisco para Cães", "Petisco para Gatos", "Shampoo Pet", "Tapete Higiênico", "Brinquedo para Pet", "Coleira", "Vermífugo", "Areia para Gatos"]],
  ["3c11d710-379a-4d23-8d56-0308f24cc65e", ["Mamadeira", "Chupeta", "Mordedor", "Sabonete para Bebê", "Shampoo para Bebê", "Colônia para Bebê", "Copo de Transição", "Termômetro Infantil"]],
  ["f7d8275a-47be-4d73-af06-51733fd1f457", ["Cereal Infantil", "Leite Infantil", "Suco Infantil", "Biscoito para Bebê", "Purê Infantil", "Mingau Infantil", "Papinha de Frutas", "Papinha de Legumes"]],
  ["56f4234d-3917-40b1-b958-80c1433e559b", ["Chia", "Farinha de Amêndoas", "Gergelim", "Pasta de Amendoim", "Semente de Abóbora", "Semente de Girassol", "Tofu", "Açúcar de Coco"]],
  ["f96219d4-7c2e-44e0-b2bf-5da32f3ca45e", ["Biscoito Diet", "Iogurte Light", "Leite Condensado Light", "Maionese Light", "Pão Light", "Suco Zero", "Adoçante Diet", "Doce de Leite Zero"]],
  ["d9f1131c-48b4-47e1-aa52-a81459f76c96", ["Tofu Defumado", "Iogurte Vegano", "Manteiga Vegana", "Maionese Vegana", "Salsicha Vegana", "Carne Vegetal", "Nuggets Veganos", "Creme de Leite Vegano"]],
  ["519f2cc2-b6f0-4c16-89b6-0cd51b7e19d0", ["Cabide", "Isqueiro", "Lâmpada", "Pilha Alcalina", "Extensão Elétrica", "Filtro de Café", "Varal", "Prendedor de Roupa"]],
  ["d3a3a92b-647a-4fc7-b647-b59edce1f5f6", ["Assadeira", "Colher de Pau", "Escorredor", "Espátula", "Forma de Bolo", "Ralador", "Tábua de Corte", "Peneira"]],
  ["de8355eb-9b80-44e9-aa67-7d33231c87c8", ["Air Fryer", "Batedeira", "Ferro de Passar", "Forno Elétrico", "Grill", "Micro-ondas", "Sanduicheira", "Torradeira"]],
  ["f769c0f0-fbd0-4650-aae9-1ddefac5d9bc", ["Grelha", "Acendedor de Churrasco", "Faca para Churrasco", "Tábua para Churrasco", "Chimichurri", "Farofa Pronta", "Pão de Alho", "Luvas Térmicas"]],
  ["5d2a260d-1537-44fe-bacd-85098523adaa", ["Pão de Hot Dog", "Pão de Hambúrguer", "Bolo Industrializado", "Croissant Industrializado", "Mini Torrada", "Pão de Mel", "Bisnaguinha Integral", "Wrap"]],
  ["724b01b4-5bd1-4ae4-9823-90d6ecaafcaa", ["Alecrim", "Açafrão", "Canela", "Cominho", "Cravo-da-Índia", "Louro", "Noz-moscada", "Páprica"]],
  ["13de2483-f0d9-474f-8d44-d8d79ed28721", ["Antialérgico", "Antisséptico", "Gaze", "Soro Fisiológico", "Termômetro", "Pomada Antisséptica", "Máscara Descartável", "Bandagem"]],
  ["9ebd452d-e87c-4a44-a420-3544f97dd3b5", ["Creatina", "Ômega 3", "Vitamina D", "Vitamina B12", "Colágeno", "Pré-treino", "BCAA", "Magnésio"]],
  ["f7a56c10-3858-4f9b-a692-a912012d4fcc", ["Sementes", "Mudas", "Regador", "Pá de Jardinagem", "Tesoura de Poda", "Casca de Pinus", "Húmus", "Pedras Decorativas"]],
  ["dc4642ba-9b4c-426b-b5ee-ce6ff29712be", ["Fluido de Freio", "Aditivo para Radiador", "Cera Automotiva", "Limpa Para-brisa", "Pneu", "Calibrador", "Pano de Microfibra Automotivo", "Limpador de Painel"]],
  ["a71bcec8-5ab8-42a2-914d-94c1414eae4c", ["Alicate", "Chave Inglesa", "Chave Phillips", "Furadeira", "Parafuso", "Prego", "Trena", "Estilete"]],
  ["2fca2fec-b8d6-4ee3-b1cb-076cb2d4b8eb", ["Calça Jeans", "Bermuda", "Cueca", "Calcinha", "Moletom", "Pijama", "Sandália", "Boné"]],
  ["f0a1f734-4b44-4549-8b96-9f1b8a988fe8", ["Quebra-cabeça", "Jogo de Cartas", "Blocos de Montar", "Bicicleta Infantil", "Ursinho de Pelúcia", "Patins", "Massinha de Modelar", "Corda de Pular"]],
];

const products: IProduct[] = [
  ...baseProducts,
  ...additionalProductsByTag.flatMap(([tag, names], tagIndex) =>
    names.map((name, productIndex) => ({
      uuid: `00000000-0000-4000-8000-${String(tagIndex * 100 + productIndex + 1).padStart(12, "0")}`,
      name,
      amount: [],
      unit: "Un" as const,
      tag,
    })),
  ),
];

export default products;
