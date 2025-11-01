import { Router } from 'express';
import * as roleCtrl from '../controllers/role.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { createRoleSchema, updateRoleSchema } from '../validators/role.validator';
import { validate } from '../middlewares/validate.middleware';
import { validateObjectId } from '../middlewares/validateObjectId.middleware';

const router = Router();

/**
* @openapi
* /roles:
*   get:
*     summary: Λίστα ρόλων
*     tags: [Roles]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Επιστρέφει array ρόλων
*/
router.get('/', authenticate, roleCtrl.list);

/**
* @openapi
* /roles:
*   post:
*     summary: Δημιουργία νέου ρόλου
*     tags: [Roles]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               role:
*                 type: string
*               active:
*                 type: boolean
*               description:
*                 type: string
*     responses:
*       201:
*         description: Ο ρόλος δημιουργήθηκε
*/
router.post('/', authenticate, validate(createRoleSchema), roleCtrl.create);

/**
 * @openapi
* /roles/{id}:
*   put:
*     summary: Ενημέρωση ρόλου
*     tags: [Roles]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               role:
*                 type: string
*               active:
*                 type: boolean
*               description:
*                 type: string
*     responses:
*       200:
*         description: Ο ρόλος ενημερώθηκε
*/
router.put('/:id', authenticate, validate(updateRoleSchema), validateObjectId('id'), roleCtrl.update);

/**
* @openapi
* /roles/{id}:
*   delete:
*     summary: Διαγραφή ρόλου
*     tags: [Roles]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Ο ρόλος διαγράφηκε
*/
router.delete('/:id', authenticate, validateObjectId('id'), roleCtrl.remove);

export default router;
