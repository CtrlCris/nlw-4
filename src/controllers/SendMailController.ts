import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRespository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUserRepository = getCustomRepository(SurveysUserRepository);

        //usuaria existe? verificar através do email
        const userAreadyExists = await userRepository.findOne({ email });

        if (!userAreadyExists) {
            return response.status(400).json({
                error: "User docs not exists",
            });
        }

        //se pesquisa existe
        const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id })

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does nor exists!",
            });
        }

        //salvar as interformações na tabela surveyUser
        const surveyUser = surveyUserRepository.create({
            user_id: surveyAlreadyExists.id,
            survey_id,
        });
        await surveyUserRepository.save(surveyUser);

        //enviar e-mail para o usuário
        return response.json(surveyUser);
    }

}

export { SendMailController }