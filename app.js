import express from 'express';
import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import shortid from 'shortid';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'; 
import path from 'path';

const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'URL Shortener API',
            version: '1.0.0',
            description: 'API for shortening URLs',
        },
    },
    apis: ['app.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const Url = sequelize.define('Url', {
    short_code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    original_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

app.use(express.json());

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a new URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               original_url:
 *                 type: string
 *                 example: "https://example.com"
 *     responses:
 *       200:
 *         description: Shortened URL created successfully
 */
app.post('/shorten', async (req, res) => {
    const { original_url } = req.body;
    const short_code = shortid.generate();
    await Url.create({ short_code, original_url });
    res.json({ short_code, short_url: `http://localhost:3000/${short_code}` });
});

/**
 * @swagger
 * /{short_code}:
 *   get:
 *     summary: Redirect to the original URL
 *     parameters:
 *       - in: path
 *         name: short_code
 *         required: true
 *         schema:
 *           type: string
 *         description: The short URL code
 *     responses:
 *       302:
 *         description: Redirecting to the original URL
 *       404:
 *         description: URL Not Found
 */
app.get('/:short_code', async (req, res) => {
    const url = await Url.findOne({ where: { short_code: req.params.short_code } });
    if (url) {
        url.clicks++;
        await url.save();
        res.status(302).redirect(url.original_url)
    } else {
        res.status(404).send('URL Not Found');
    }
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
