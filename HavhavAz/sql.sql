SET IDENTITY_INSERT [dbo].[Vets] ON
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (1, N'0001-01-01 00:00:00', 0)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (2, N'0001-01-01 00:00:00', 10)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (3, N'0001-01-01 00:00:00', 20)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (4, N'0001-01-01 00:00:00', 30)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (5, N'0001-01-01 00:00:00', 40)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (6, N'0001-01-01 00:00:00', 50)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (7, N'0001-01-01 00:00:00', 60)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (8, N'0001-01-01 00:00:00', 70)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (9, N'0001-01-01 00:00:00', 80)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (10, N'0001-01-01 00:00:00', 90)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (11, N'0001-01-01 00:00:00', 100)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (12, N'0001-01-01 00:00:00', 110)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (13, N'0001-01-01 00:00:00', 120)
INSERT INTO [dbo].[Vets] ([ID], [FoundedDate], [Position]) VALUES (14, N'0001-01-01 00:00:00', 130)
SET IDENTITY_INSERT [dbo].[Vets] OFF

SET IDENTITY_INSERT [dbo].[VetTranslations] ON
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (1, N'Alfavet', N'Baytarlar: Alla və Rüfət</br>İş qrafiki: с 10.00 – 18:00, şənbə – qısa gün: с 11:00 – 18:00, bazar günü - işləmir.</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, laborator araşdırmalar, stomatoloqiya, RENTGEN (xırda heyvanlar üçün).</br>Xahiş olunur əvvəlcədən qəbula yazılasınız!</br>', 0, 1)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (2, N'ROYAL VET', N'Baytarlar: Cavadov Tərlan</br>İş qrafiki: с 10.00 – 18:00, bazar günü - işləmir.</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, UZİ, RENTGEN.</br>', 0, 2)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (3, N'Şəhər baytarlıq klinikası', N'Baytarlar: – Anar (055 778-40-12), Adil (050-371-63-21) və Pərviz (050-323-73-51).</br>İş qrafiki: 10.00 - 17.30, şənbə, bazar - işləmir.</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya.</br>', 0, 3)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (4, N'ZOO DOM - ROYAL CANIN', N'Baytarlar: Elmar.</br>İş qrafiki : 12:00 – 18:00, çərşənbə - işləmir.</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya.</br>', 0, 4)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (5, N'Animal Care Clinic', N'Baytarlar: Cavid. </br>İş qrafiki: 12:00 – 18:00 (həftənin bütün günləri)</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya.</br>Xahiş olunur əvvəlcədən qəbula yazılasınız!</br>', 0, 5)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (6, N'VET-LINE', N'Baytarlar: Yana.</br>İş qrafiki: 11:00 - 19:00, Bazar ertəsi - işləmir.</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, laborator araşdırmalar, STASİONAR VAR.</br>Xahiş olunur əvvəlcədən qəbula yazılasınız!</br>', 0, 6)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (7, N'Bayer - "ROYAL CANIN"', N'Baytarlar: Fuad Əskərov </br>İş qrafiki: 10:00 - 19:00, bazar - işləmir</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, laborator araşdırmalar, UZİ, RENTGEN.</br>', 0, 7)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (8, N'IDEA Center', N'İş qrafiki: 9:00 – 18:00</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, laborator araşdırmalar, dermatoloqiya, UZİ, RENTGEN.</br>Xahiş olunur əvvəlcədən qəbula yazılasınız!</br>', 0, 8)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (9, N'Vetexpert', N'Baytarlar: Ruslana</br>İş qrafiki: 10:00 – 18:00, bazar - işləmir</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, laborator araşdırmalar, UZİ, RENTGEN, STASİONAR VAR.</br>', 0, 9)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (10, N'VETMASTER', N'Baytarlar: Yelena Sokolova və Həsən doktor</br>İş qrafiki: 10.00 - 18.00 (həftənin bütün günləri)</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, dermatoloqiya, dişlərin ultrasəsli təmizlənməsi, UZİ, RENTGEN.</br>Xahiş olunur əvvəlcədən qəbula yazılasınız!</br>', 0, 10)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (11, N'AARС Clinic', N'RENTGEN VAR!</br>İş qrafiki: 9:00 – 17:00, bazar - işləmir</br>', 0, 11)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (12, N'Shikina Marina', N'İş qrafiki: 13.00 - 18.00, cümə axşamı - işləmir</br>Xidmətər: heyvanların ambulator qəbulu, diaqnostika, terapiya, cərrahiyə, vaksinasiya, qruminq.</br>', 0, 12)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (13, N'Baku Zoopark', N'Baytar: Çingiz</br>İş qrafiki: 9:00 - 18:00</br>', 0, 13)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (14, N'Sumqayıtda baytar', N'Baytar: Rəşad </br>Mənzilə çağırışla işləyir.</br>', 0, 14)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (16, N'Alfavet', N'‌Ветеринары: Алла и Руфат. </br>Время работы: с 10.00 – 18:00, в субботу – короткий день: с 11:00 – 18:00, выходной - воскресенье.</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация, лабораторные исследования, стоматология, РЕНТГЕН (для мелких животных).</br>Приём осуществляется только по записи!</br></br>', 1, 1)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (17, N'ROYAL VET', N'Ветеринар: Джавадов Тарлан </br>Время работы: 10.00 - 18.00, выходной - воскресенье</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация, УЗИ, РЕНТГЕН.</br></br>', 1, 2)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (18, N'Городская ветеринарная клиника', N'Ветеринары – Анар (055 778-40-12), Адиль (050-371-63-21) и Пярвиз (050-323-73-51).</br>Время работы: 10.00 - 17.30, выходной – суббота, воскресение.</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация.</br></br>', 1, 3)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (19, N'ZOO DOM - ROYAL CANIN', N'Ветеринар – Эльмар.</br>Время работы : 12:00 – 18:00, выходной – среда </br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация.</br></br>', 1, 4)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (20, N'Animal Care Clinic', N'Ветеринар – Джавид. </br>Время работы : 12:00 – 18:00, выходной – работает без выходных</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация.</br>Приём осуществляется только по записи! </br></br>', 1, 5)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (21, N'VET-LINE', N'Ветеринар - Яна</br>Время работы: 11:00 - 19:00, выходной - понедельник</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация, лабораторные исследования, ИМЕЕТСЯ СТАЦИОНАР.</br>Приём осуществляется только по записи! </br></br>', 1, 6)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (22, N'Bayer - "ROYAL CANIN"', N'Ветеринар – Фуад Аскеров </br>Время работы: 10:00 - 19:00, выходной – воскресение</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация, УЗИ, РЕНТГЕН, лабораторные исследования.</br></br>', 1, 7)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (23, N'IDEA Center', N'Время работы: 9:00 – 18:00</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, дерматология, вакцинация, лабораторные исследования, РЕНТГЕН, УЗИ. </br>Приём осуществляется только по записи! </br></br>', 1, 8)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (24, N'Vetexpert', N'Ветеринар: Руслана</br>Время работы: 10:00 – 18:00, выходной – воскресенье</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация, УЗИ, РЕНТГЕН, лабораторные исследования. ИМЕЕТСЯ СТАЦИОНАР!</br></br>', 1, 9)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (25, N'VETMASTER', N'Ветеринар: Соколова Елена и доктор Гасан</br>Время работы: 10.00 - 18.00, выходной – работает без выходных</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, дерматология, вакцинация, ультразвуковая чистка зубов, РЕНТГЕН, УЗИ. </br>Приём осуществляется только по записи! </br></br>', 1, 10)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (26, N'AARС Clinic', N'ИМЕЕТСЯ РЕНТГЕН!</br>(время работы: 9:00 – 17:00, выходной – воскресение)</br></br>', 1, 11)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (27, N'Шикина Марина', N'время работы: 13.00 - 18.00, выходной - четверг</br>Услуги: амбулаторный приём животных, диагностика, терапия, хирургия, вакцинация, груминг.</br></br>', 1, 12)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (28, N'Бакинский зоопарк', N'Ветеринар - Чингиз.</br>время работы: 9:00 - 18:00</br>АДРЕС: ул. Бакиханова, 39 </br></br>', 1, 13)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (29, N'Ветеринар в Сумгаите', N'Ветеринар - Рашад. </br>Выезжает на дом. </br></br>', 1, 14)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (30, N'Alfavet', N'‌Vets: Alla&Rufat</br>Schedule: 10.00 – 18:00, Saturday – short day: 11:00 – 18:00, off day - Sunday.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination, laboratory tests, dentistry, X-ray (for small animals).</br>Visit is by appointment only!</br></br>', 2, 1)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (31, N'ROYAL VET', N'Vet: Javidov Tarlan</br>Schedule: 10.00 – 18:00, off day - Sunday.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination, ultrasound, X-ray.</br></br>', 2, 2)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (32, N'City Veterinary Clinic ', N'Vets – Anar (055 778-40-12), Adel (050-371-63-21) and Parviz (050-323-73-51).</br>Schedule: 10.00 – 17:30, off day - Saturday, Sunday.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination.</br></br>', 2, 3)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (33, N'ZOO DOM - ROYAL CANIN', N'Vet – Elmar.</br>Schedule: 12.00 – 18:00, off day - Wednesday.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination.</br></br>', 2, 4)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (34, N'Animal Care Clinic', N'Vet – Javid. </br>Schedule: 12.00 – 18:00, NO off day.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination.</br>Visit is by appointment only!</br></br>', 2, 5)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (35, N'VET-LINE', N'Vet - Yana</br>Schedule: 11:00 - 19:00, off day - Monday.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination, HAS A HOSPITAL!</br>Visit is by appointment only!</br></br>', 2, 6)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (36, N'Bayer - "ROYAL CANIN"', N'Vet – Fuad Askarov </br>Schedule: 10:00 - 19:00, off day - Sunday.</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination, laboratory tests, ultrasound, X-ray.</br></br>', 2, 7)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (37, N'IDEA Center', N'Schedule: 9:00 – 18:00</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, dermatology, vaccination, laboratory tests, X-rays, ultrasound.</br>Visit is by appointment only!</br></br>', 2, 8)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (38, N'Vetexpert', N'Vet: Ruslana</br>Schedule: 10:00 – 18:00, off day - Sunday</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination, laboratory tests, X-rays, ultrasound, HAS A HOSPITAL!</br></br>', 2, 9)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (39, N'VETMASTER', N'Vets: Sokolova Elena & Dr. Hasan</br>Schedule: 10:00 – 18:00, NO off days</br>Services: animal ambulance, diagnostics, therapy, surgery, dermatology, vaccination, ultrasonic brushing, X-rays, ultrasound.</br>Visit is by appointment only!</br></br>', 2, 10)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (40, N'AARС Clinic', N'has a X-ray!</br>Schedule: 9:00 – 17:00, off day - Sunday</br></br>', 2, 11)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (41, N'Shikina Marina', N'Schedule: 13.00 - 18.00, off day - Thursday</br>Services: ambulatory reception of animals, diagnostics, therapy, surgery, vaccination, grooming.</br></br>', 2, 12)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (42, N'Baku Zoo', N'Vet - Chingiz.</br>Schedule: 9:00 - 18:00</br></br>', 2, 13)
INSERT INTO [dbo].[VetTranslations] ([ID], [Name], [Info], [Culture], [VetId]) VALUES (43, N'Vet in Sumgait', N'Vet - Rashad. </br>Works on call to the apartment.</br></br>', 2, 14)
SET IDENTITY_INSERT [dbo].[VetTranslations] OFF

SET IDENTITY_INSERT [dbo].[Contacts] ON
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (1, NULL, NULL, NULL, N'(012) 441-47-40; (055) 334-44-23; (050) 343-27-82', 1, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (2, NULL, NULL, NULL, N'(12) 597-17-56; (055) 422-21-71; (055) 422-21-65 ', 2, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (3, NULL, NULL, NULL, N'(012) 411-18-01', 3, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (4, NULL, NULL, NULL, N'(050)750-23-20; (012) 498-55-92', 4, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (5, NULL, NULL, NULL, N'(055) 780-07-08; (050) 228 37 01', 5, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (6, NULL, NULL, NULL, N'(050) 313-06-58; (012) 440-45-87', 6, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (7, NULL, NULL, NULL, N'(050) 245-21-71; (050) 245-21-65; (012) 497-79-25', 7, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (8, NULL, NULL, NULL, N'(012) 565-66-55; (051) 295-27-34', 8, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (9, NULL, NULL, NULL, N'(077) 722-10-10; (012) 493-07-62', 9, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (10, NULL, NULL, NULL, N'(12) 323-07-94; +994 (50) 354-40-26 ', 10, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (11, NULL, NULL, NULL, N'(050 - 055 – 070) 355-17-17', 11, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (12, NULL, NULL, NULL, N'(012) 440 40 33; (050) 338-90-71; (070) 338-90-71', 12, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (13, NULL, NULL, NULL, N'(050) 610-47-85; (+99412) 440-10-96, 441-04-54', 13, 2)
INSERT INTO [dbo].[Contacts] ([ID], [Facebook], [Whatsapp], [Instagram], [Phone], [SubjectId], [SubjectType]) VALUES (14, NULL, NULL, NULL, N'055-786-74-92.', 14, 2)
SET IDENTITY_INSERT [dbo].[Contacts] OFF

SET IDENTITY_INSERT [dbo].[Addresses] ON
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (1, N'Nəsimi rayonu, X.Ələsgərov 11 küçəsi (Zorqe parkının yaxınlığında) ', 0, 1)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (2, N'Vaqif prokspekti, ev 3, mənzil 115 (Zorqe parkının yaxınlığında) ', 0, 2)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (3, N'Binəqədi', 0, 3)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (4, N'Bakı şəhəri, 28 may küçəsi 46 (23 nömrəli məktəbin yaxınlığında).', 0, 4)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (5, N'İzmir küçəsi 7 (Qlobus plaza ilə üzbəüz)', 0, 5)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (6, N'Azadlıq 119B (Amerika səfirliyinə çatmamış)', 0, 6)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (7, N'Bakı şəhəri, Nizami 26.', 0, 7)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (8, N'Bakı şəhəri, Qaradağ rayonu, Bakı-Salyan şosessi 19km', 0, 8)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (9, N'Mirzə Ağa Əliyev küçəsi 251', 0, 9)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (10, N'Qara Qarayev m/s, Manafov küçəsi 14 (60А)', 0, 10)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (11, N'Bakı şəhəri, Şamaxı yolu 15km, Binəqədi rayonu', 0, 11)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (12, N'Azadlıq prospekti 201', 0, 12)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (13, N'Bakıxanov küçəsi 39', 0, 13)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (14, N'Sumqayıt şəhəri', 0, 14)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (15, N'Насиминский район, улица Х.Алескерова 11 (Около парка Зорге) ', 1, 1)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (16, N'Проспект Вагифа, дом 3, кв 115 (около парка Зорге) ', 1, 2)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (17, N'Бинагады', 1, 3)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (18, N'г. Баку , ул. 28 мая 46 (рядом с 23 школой).', 1, 4)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (19, N'улица Измир 7 (напротив Глобус Плазы)', 1, 5)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (20, N'Азадлыг 119Б (не доезжая до Американского посольства)', 1, 6)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (21, N'г. Баку Низами ,26.', 1, 7)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (22, N'г. Баку, , Гарадагский район, 19 км по шоссе Баку-Сальян', 1, 8)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (23, N'улица Мирза Ага Алиева 251', 1, 9)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (24, N'м. Гара Гараева, ул. Манафова, 14 (по новому - 60А)', 1, 10)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (25, N'г. Баку. Шамахинская дорога 15 км. Бинагадинский район', 1, 11)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (26, N'пр. Азадлыг 201', 1, 12)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (27, N'пр. Бакинский зоопарк', 1, 13)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (28, N'Город Сумгаит', 1, 14)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (29, N'Nasimi district, Alasgarov street 11 (near Zorge park) ', 2, 1)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (30, N'Vagif avenue, home 3, apartment 115 (near Zorge park) ', 2, 2)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (31, N'Binaghadi', 2, 3)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (32, N'28 may street 46 (next to school No 23).', 2, 4)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (33, N'Izmir street 7 (in front of Globus Plaza)', 2, 5)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (34, N'Azadlig 119B (next to Embassy of USA)', 2, 6)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (35, N'Nizami 26.', 2, 7)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (36, N'Baku city, Qaradag distrtic, 19 km on the highway Baku-Salyan', 2, 8)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (37, N'Mirza Agha Aliyev street 251', 2, 9)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (38, N'Qara Qarayev metrostation, Manafov street 14 (60A) ', 2, 10)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (39, N'Baku city, Shamakhi road 15 km, Binaghadi district', 2, 11)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (40, N'Azadlig avenue 201', 2, 12)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (41, N'Bakikhanov street 39', 2, 13)
INSERT INTO [dbo].[Addresses] ([ID], [Location], [Culture], [ContactsId]) VALUES (42, N'Sumgait City', 2, 14)
SET IDENTITY_INSERT [dbo].[Addresses] OFF


USE DB_A54924_havhav
GO
CREATE TRIGGER VetDeleteContacts
    ON Vets
    AFTER DELETE
AS
    DELETE FROM Contacts
    WHERE SubjectType = 2 AND SubjectId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER ShelterDeleteContacts
    ON Shelters
    AFTER DELETE
AS
    DELETE FROM Contacts
    WHERE SubjectType = 1 AND SubjectId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER UserDeleteContacts
    ON Users
    AFTER DELETE
AS
    DELETE FROM Contacts
    WHERE SubjectType = 0 AND SubjectId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER AdDeletePosts
    ON Ads
    AFTER DELETE
AS
    DELETE FROM Posts
    WHERE PostType = 1 AND SubjectId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER CharityDeletePosts
    ON Charities
    AFTER DELETE
AS
    DELETE FROM Posts
    WHERE PostType = 2 AND SubjectId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER UserDeletePosts
    ON Users
    AFTER DELETE
AS
    DELETE FROM Posts
    WHERE UserId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER PostDeleteNotifications
    ON Posts
    AFTER DELETE
AS
    DELETE FROM Notifications
    WHERE NotificationType = 0 AND SubjectId = (SELECT deleted.id FROM deleted)
GO

USE DB_A54924_havhav
GO
CREATE TRIGGER ReceiptDeleteNotifications
    ON Receipts
    AFTER DELETE
AS
    DELETE FROM Notifications
    WHERE NotificationType = 2 AND SubjectId = (SELECT deleted.id FROM deleted)
GO