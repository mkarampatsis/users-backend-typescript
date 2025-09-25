import { Router } from 'express';
import * as roleCtrl from '../controllers/role.controller';
import { authenticate } from '../middlewares/auth.middleware';

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
*     responses:
*       201:
*         description: Ο ρόλος δημιουργήθηκε
*/
router.post('/', authenticate, roleCtrl.create);

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
*     responses:
*       200:
*         description: Ο ρόλος ενημερώθηκε
*/
router.patch('/:id', authenticate, roleCtrl.update);

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
router.delete('/:id', authenticate, roleCtrl.remove);

export default router;
