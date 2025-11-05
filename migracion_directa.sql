-- Migrar usuario
INSERT INTO usuario (email, password, id, "isEmailVerified", type, esencia, "createdAt", "hasSeenInstructions")
SELECT email, password, id, "isEmailVerified", type, esencia, "createdAt", "readDocumentation" as "hasSeenInstructions" 
FROM public.usuario 
WHERE NOT EXISTS (SELECT 1 FROM usuario u WHERE u.email = public.usuario.email);

-- Migrar espiritu
INSERT INTO espiritu (id, nombre, descripcion, foto, id_usuario, descripcion_sistema)
SELECT id, nombre, descripcion, foto, id_usuario, descripcion_sistema 
FROM public.espiritu 
WHERE NOT EXISTS (SELECT 1 FROM espiritu e WHERE e.id = public.espiritu.id);

-- Migrar pregunta
INSERT INTO pregunta (id, descripcion, respuesta, id_usuario, fecha, tipo, favorito)
SELECT id, descripcion, respuesta, id_usuario, fecha, tipo, favorito 
FROM public.pregunta 
WHERE NOT EXISTS (SELECT 1 FROM pregunta p WHERE p.id = public.pregunta.id);

-- Migrar respuesta
INSERT INTO respuesta (respuesta, id)
SELECT respuesta, id 
FROM public.respuesta 
WHERE NOT EXISTS (SELECT 1 FROM respuesta r WHERE r.id = public.respuesta.id);

-- Migrar moneda
INSERT INTO moneda (id, descripcion)
SELECT id, descripcion 
FROM public.moneda 
WHERE NOT EXISTS (SELECT 1 FROM moneda m WHERE m.id = public.moneda.id);

-- Migrar respuesta_dia
INSERT INTO respuesta_dia (id, respuesta)
SELECT id, respuesta 
FROM public.respuesta_dia 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_dia rd WHERE rd.id = public.respuesta_dia.id);

-- Migrar respuesta_especial
INSERT INTO respuesta_especial (id, respuesta)
SELECT id, respuesta 
FROM public.respuesta_especial 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_especial re WHERE re.id = public.respuesta_especial.id);

-- Migrar esencia
INSERT INTO esencia (id, precio, descripcion, descuento)
SELECT id, precio, descripcion, descuento 
FROM public.esencia 
WHERE NOT EXISTS (SELECT 1 FROM esencia e WHERE e.id = public.esencia.id);

-- Migrar respuesta_predialogo
INSERT INTO respuesta_predialogo (respuesta, id)
SELECT respuesta, id 
FROM public.respuesta_predialogo 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_predialogo rp WHERE rp.id = public.respuesta_predialogo.id);

-- Migrar respuesta_general1
INSERT INTO respuesta_general1 (id, respuesta)
SELECT id, respuesta 
FROM public.respuesta_general1 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_general1 rg WHERE rg.id = public.respuesta_general1.id);

-- Migrar respuesta_general2
INSERT INTO respuesta_general2 (id, respuesta)
SELECT id, respuesta 
FROM public.respuesta_general2 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_general2 rg WHERE rg.id = public.respuesta_general2.id);

-- Migrar respuesta_general3
INSERT INTO respuesta_general3 (id, respuesta)
SELECT id, respuesta 
FROM public.respuesta_general3 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_general3 rg WHERE rg.id = public.respuesta_general3.id);

-- Migrar respuesta_general4
INSERT INTO respuesta_general4 (id, respuesta)
SELECT id, respuesta 
FROM public.respuesta_general4 
WHERE NOT EXISTS (SELECT 1 FROM respuesta_general4 rg WHERE rg.id = public.respuesta_general4.id);

-- Migrar evaluacion_general
INSERT INTO evaluacion_general (id, user_id, respuesta_general1, respuesta_general2, respuesta_general3, respuesta_general4)
SELECT id, user_id, respuesta_general1, respuesta_general2, respuesta_general3, respuesta_general4 
FROM public.evaluacion_general 
WHERE NOT EXISTS (SELECT 1 FROM evaluacion_general eg WHERE eg.id = public.evaluacion_general.id);

-- Migrar transferencia
INSERT INTO transferencia (id, user_id, receiver, amount, date)
SELECT id, user_id, receiver, amount, date 
FROM public.transferencia 
WHERE NOT EXISTS (SELECT 1 FROM transferencia t WHERE t.id = public.transferencia.id);

-- Migrar compra
INSERT INTO compra (id, email, date, bank_order)
SELECT id, email, date, bank_order 
FROM public.compra 
WHERE NOT EXISTS (SELECT 1 FROM compra c WHERE c.id = public.compra.id);

-- Migrar notificaciones
INSERT INTO notificaciones (id, id_usuario, descripcion, estado, date, nombre, tipo)
SELECT id, id_usuario, descripcion, estado, date, nombre, tipo 
FROM public.notificaciones 
WHERE NOT EXISTS (SELECT 1 FROM notificaciones n WHERE n.id = public.notificaciones.id);

-- Migrar launch
INSERT INTO launch (id, "userId", type, "shortType", "hexResults", steps, "createdAt", "updatedAt")
SELECT id, "userId", type, "shortType", "hexResults", steps, "createdAt", "updatedAt" 
FROM public.launch 
WHERE NOT EXISTS (SELECT 1 FROM launch l WHERE l.id = public.launch.id);

-- Migrar message
INSERT INTO message (id, type, "segmentKey", language, content, "createdAt", "updatedAt")
SELECT id, type, "segmentKey", language, content, "createdAt", "updatedAt" 
FROM public.message 
WHERE NOT EXISTS (SELECT 1 FROM message m WHERE m.id = public.message.id);
