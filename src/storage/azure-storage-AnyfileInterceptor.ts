import {
    AzureStorageOptions,
    AzureStorageService,
  } from '@nestjs/azure-storage';
  import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    mixin,
    NestInterceptor,
    Type,
  } from '@nestjs/common';
  import {
    FileFieldsInterceptor,
    AnyFilesInterceptor,
    FilesInterceptor,
  } from '@nestjs/platform-express';
  import {
    MulterField,
    MulterOptions,
  } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
  import { Observable } from 'rxjs';
  
  export interface FileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    filename: string;
    buffer: string;
  }
  
  export function AzureStorageAnyFileInterceptor(
    localOptions?: MulterOptions,
  ): Type<NestInterceptor> {
    @Injectable()
    class MixinInterceptor implements NestInterceptor {
      interceptor: NestInterceptor;
      constructor(private readonly azureStorage: AzureStorageService) {
        this.interceptor = new (AnyFilesInterceptor(
          localOptions
        ))();
      }
      async intercept(
        context: ExecutionContext,
        next: CallHandler,
      ): Promise<Observable<FileInterface>> {
        (await this.interceptor.intercept(context, next)) as Observable<any>;
        const request = context.switchToHttp().getRequest();
        Object.assign(request.files).forEach(async (objectFiles) => {
          const files = objectFiles;
          // if (!files) {
          //     if (files.fieldName != fieldName) {
          //         Logger.warn(
          //             'AzureStorageFileInterceptor',
          //             `Can not intercept field "${fieldName}". Did you specify the correct field name in @AzureStorageFileInterceptor('${fieldName}')?`,
          //         );
          //     }
          //     Logger.warn(
          //         'AzureStorageFileInterceptor',
          //         `Can not intercept file . Did you attach the correct file name ?`,
          //     );
          //     return next.handle();
          // }
          const storageUrl = await this.azureStorage.upload(files);        
          files.storageUrl = storageUrl;
        });
        return next.handle();
      }
    }
  
    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>;
  }
  